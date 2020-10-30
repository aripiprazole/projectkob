package com.lorenzoog.projectkob.daemon.services

import com.github.dockerjava.api.DockerClient
import com.github.dockerjava.api.model.Frame
import com.github.dockerjava.api.model.StreamType
import com.lorenzoog.projectkob.core.models.App
import com.lorenzoog.projectkob.core.models.AppState
import com.lorenzoog.projectkob.core.models.Log
import com.lorenzoog.projectkob.core.models.LogType
import com.lorenzoog.projectkob.daemon.utils.executeAsChannel
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.*
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.concurrent.Executors
import kotlin.time.ExperimentalTime
import kotlin.time.seconds

typealias ContainerId = String

@OptIn(ExperimentalTime::class)
private val HEALTH_CHECK_INTERVAL = 5.seconds
private const val PREFIX = "kob@DaemonService"

/**
 * Instance that handles the app deployment
 */
interface DaemonService {
    /**
     * Will start and get the log messages from the execution
     *
     * @param containerId the container that will be started
     * @return the [Log]'s [Channel] with [Channel.UNLIMITED] capacity
     * @see Channel
     * @see Log
     */
    suspend fun startContainer(containerId: ContainerId): Channel<Log>

    /**
     * Will stop the container
     *
     * @param containerId the container that will be stopped
     */
    suspend fun stopContainer(containerId: ContainerId)

    /**
     * Will kill the container
     *
     * @param containerId the container that will be killed
     */
    suspend fun killContainer(containerId: ContainerId)

    /**
     * Will kill the container
     *
     * @param containerId the container that will be killed
     */
    suspend fun attach(containerId: ContainerId): Flow<Log>

    /**
     * Will fork the process and will be supervise by outer scope.
     *
     * @param containerId the container id returned from [createContainer]
     * @return [AppState]'s [Flow]
     * @see Flow
     * @see App
     * @see AppState
     */
    suspend fun inspectContainer(containerId: ContainerId): Flow<AppState>
}

@Suppress("FunctionName")
fun DaemonService(docker: DockerClient): DaemonService {
    return DockerDaemonService(LoggerFactory.getLogger("DaemonService"), docker)
}

@OptIn(ExperimentalCoroutinesApi::class)
@Suppress("DELEGATED_MEMBER_HIDES_SUPERTYPE_OVERRIDE")
private class DockerDaemonService(
    private val logger: Logger,
    private val docker: DockerClient
) : DaemonService, CoroutineScope {
    override val coroutineContext = Executors.newFixedThreadPool(4).asCoroutineDispatcher() +
            CoroutineExceptionHandler { _, error ->
                error.printStackTrace()
            }

    override suspend fun startContainer(containerId: ContainerId): Channel<Log> {
        val channel = Channel<Log>(Channel.UNLIMITED)

        logger.info("Creating exec for containerId = $containerId")

        val exec = withContext(coroutineContext + CoroutineName("$PREFIX-#execCreate-$containerId")) {
            docker.startContainerCmd(containerId).exec()

            docker.execCreateCmd(containerId).withCmd("-it").exec()
        }

        logger.info("Starting exec for execId = ${exec.id}")

        val logs = withContext(coroutineContext + CoroutineName("$PREFIX-#execStart-${exec.id}")) {
            docker.execStartCmd(exec.id)
                .withDetach(true)
                .executeAsChannel()
        }

        logs.consumeAsFlow().onEach {
            channel.send(it.asLog())
        }.launchIn(this)

        logger.info("Started exec: ${exec.id}")

        return channel
    }

    override suspend fun stopContainer(containerId: ContainerId) {
        docker.stopContainerCmd(containerId)
    }

    override suspend fun killContainer(containerId: ContainerId) {
        docker.killContainerCmd(containerId)
    }

    override suspend fun attach(containerId: ContainerId) = withContext(coroutineContext) {
        docker.attachContainerCmd(containerId)
            .executeAsChannel()
            .consumeAsFlow()
            .map { it.asLog() }
            .onEach {  (message, type) ->
                println("$type: $message")
            }
    }

    @OptIn(ExperimentalTime::class)
    override suspend fun inspectContainer(containerId: ContainerId): Flow<AppState> {
        val state = MutableStateFlow<AppState>(AppState.None)

        // create a side effect to inspect pool that will be called: state check
        tailrec suspend fun checkState() {
            val response = docker.inspectContainerCmd(containerId).exec()

            val exitCode = if (response.state.exitCodeLong != null) response.state.exitCodeLong!! else 0

            state.value = when {
                response.state.dead ?: false -> AppState.Stopped(exitCode)
                response.state.paused ?: false -> AppState.Stopped(exitCode)
                response.state.running ?: false -> AppState.Started
                response.state.restarting ?: false -> AppState.Starting
                response.state.status == "created" -> AppState.Deployed
                response.state.exitCodeLong != null -> AppState.Stopped(exitCode)
                else -> AppState.None
            }

            println("Checking state of $containerId: ${response.state.status}, ${state.value}")

            delay(HEALTH_CHECK_INTERVAL)

            checkState()
        }

        CoroutineScope(SupervisorJob() + coroutineContext).launch {
            println("START CHECKING STATE")

            checkState()
        }

        return state // returns the state to be handled by any another code
    }
}

private fun StreamType.asLogType() = when (this) {
    StreamType.STDOUT -> LogType.Info
    StreamType.STDIN -> LogType.Input
    StreamType.STDERR -> LogType.Error

    else -> LogType.None
}

private fun Frame.asLog() = Log(payload.toString(Charsets.UTF_8), streamType.asLogType())