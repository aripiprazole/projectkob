package com.lorenzoog.projectkob.daemon.services

import com.github.dockerjava.api.DockerClient
import com.github.dockerjava.api.model.ExposedPort
import com.github.dockerjava.api.model.HostConfig
import com.github.dockerjava.api.model.Ports
import com.lorenzoog.projectkob.core.models.App
import com.lorenzoog.projectkob.core.models.AppState
import com.lorenzoog.projectkob.core.utils.error
import com.lorenzoog.projectkob.core.utils.info
import com.lorenzoog.projectkob.daemon.utils.executeAsChannel
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.serialization.Serializable
import org.eclipse.jgit.api.Git
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.File
import java.util.concurrent.Executors
import kotlin.properties.Delegates.notNull

private const val PREFIX = "kob@DeployService"

interface DeployService {
  /**
   * Will deploy and get the container id of app
   *
   * @param app the app that will be created the container
   * @param config the config that will be used to create [app]'s container
   * @return Created container id for [app]
   * @see App
   * @see DeployConfig
   * @see ContainerId
   */
  suspend fun deploy(app: App, config: DeployConfig): ContainerId

  suspend fun findContainerIdByAppId(appId: String): ContainerId?
}

@Suppress("FunctionName")
fun DeployService(docker: DockerClient): DeployService {
  return DockerDeployService(LoggerFactory.getLogger("DeployService"), docker, linkedMapOf())
}

private class DockerDeployService(
  private val logger: Logger,
  private val docker: DockerClient,
  private val appIdContainerIdMap: MutableMap<String, ContainerId>
) : DeployService, CoroutineScope {
  override val coroutineContext = Executors.newFixedThreadPool(8).asCoroutineDispatcher()

  @OptIn(ExperimentalCoroutinesApi::class)
  override suspend fun deploy(app: App, config: DeployConfig): ContainerId {
    logger.info("Deploying container for $app")

    val image = "${app.id}:1.0"
    val buildDir = File("daemon/repositories/${app.id}").also { file ->
      if (file.exists()) file.deleteRecursively()
    }

    Git.cloneRepository()
      .setURI(config.repo)
      .setDirectory(buildDir)
      .call()

    docker.buildImageCmd()
      .withDockerfile(File(buildDir, "backend/Dockerfile"))
      .withTags(setOf(image))
      .executeAsChannel()
      .consumeAsFlow()
      .onEach { item ->
        val message = (item.stream ?: return@onEach)
          .replace("\n", " ")

        app.logs.info(message)
        logger.trace("Building ${app.simpleId}: $message")
      }
      .catch { error ->
        val message = error.message ?: "No error message provided: ${error::class.qualifiedName}"

        app.logs.error(message)
      }
      .filter { it.isBuildSuccessIndicated }
      .single()

    logger.info("Downloaded image for repo ${config.repo}: $image")

    val container = withContext(coroutineContext + CoroutineName("$PREFIX-#deploy-${app.id}")) {
      docker.createContainerCmd(image)
        .withEnv(config.env.map { (key, value) ->
          "$key=$value"
        })
        .withWorkingDir("/app-${app.id}")
        .withAttachStdout(true)
        .withAttachStdin(true)
        .withAttachStderr(true)
        .withHostConfig(
          HostConfig.newHostConfig().withPortBindings(
            Ports(
              ExposedPort.tcp(8080),
              Ports.Binding.bindPort(9090)
            )
          )
        )
        .exec()
    }

    logger.info("Deployed container for $app: $container")

    appIdContainerIdMap[app.id] = container.id

    app.state.value = AppState.Deployed

    return container.id
  }

  override suspend fun findContainerIdByAppId(appId: String): ContainerId? {
    return appIdContainerIdMap[appId]
  }
}

@Suppress("FunctionName")
inline fun DeployConfig(builder: DeployConfigBuilder.() -> Unit): DeployConfig =
  DeployConfigBuilder().apply(builder).build()

@Serializable
data class DeployConfig(
  val repo: String,
  val memory: Long,
  val ports: Map<Int, Int>,
  val env: Map<String, String>,
)

class DeployConfigBuilder {
  lateinit var repository: String
  var memory by notNull<Long>()
  var env = mutableMapOf<String, Any>()
  var ports = mutableMapOf<Int, Int>()

  fun build() = DeployConfig(
    repository,
    memory,
    ports,
    env.mapValues { (_, value) -> value.toString() },
  )
}
