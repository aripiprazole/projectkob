package com.lorenzoog.projectkob.daemon

import br.com.devsrsouza.eventkt.scopes.LocalEventScope
import com.lorenzoog.projectkob.core.models.AppState
import com.lorenzoog.projectkob.core.services.AppService
import com.lorenzoog.projectkob.daemon.config.createDockerClient
import com.lorenzoog.projectkob.daemon.config.getAppConfig
import com.lorenzoog.projectkob.daemon.services.DaemonService
import com.lorenzoog.projectkob.daemon.services.DeployService
import com.lorenzoog.projectkob.daemon.services.ImageService
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// TODO(change to kubernetes)
// TODO(create logging service with elastic search)
// TODO(create deploy system with docker)
// TODO(integrate with rabbit mq)
@OptIn(FlowPreview::class)
suspend fun main(): Unit = withContext(SupervisorJob() + CoroutineName("kob@main")) {
    val config = getAppConfig()
    val docker = createDockerClient(config)
    val eventScope = LocalEventScope()

    val daemonService = DaemonService(docker)
    val deployService = DeployService(docker)
    val imageService = ImageService(docker)

    lateinit var appService: AppService

    val appId = "8432750"

    appService.findAppById(appId).state
        .filterIsInstance<AppState.Deployed>()
        .map { deployService.findContainerIdByAppId(appId) }
        .filterNotNull()
        .flatMapConcat { app -> daemonService.inspectContainer(app) }
        .collect { appState ->
            println("RECEIVED $appState")
        }
}
