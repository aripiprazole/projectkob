@file:OptIn(KtorExperimentalLocationsAPI::class)

package com.lorenzoog.projectkob.server.routes.apps

import com.lorenzoog.projectkob.daemon.services.DaemonService
import com.lorenzoog.projectkob.daemon.services.DeployConfig
import com.lorenzoog.projectkob.daemon.services.DeployService
import com.lorenzoog.projectkob.server.auth.authenticated
import io.ktor.application.*
import io.ktor.http.*
import io.ktor.http.cio.websocket.*
import io.ktor.locations.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.*
import io.ktor.websocket.*
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.flow.launchIn
import kotlinx.coroutines.flow.onEach
import org.koin.ktor.ext.inject

@OptIn(KtorExperimentalLocationsAPI::class, KtorExperimentalAPI::class)
fun Route.daemonRoutes() = authenticated {
  val daemonService by inject<DaemonService>()
  val deployService by inject<DeployService>()

  // TODO: remove, just for debugging
  get("/apps/{id}/state") {
    val app = call.findAppByParameters()

    val containerId = deployService.findContainerIdByAppId(app.id)
      ?: return@get call.respond("Do not have container id.")

    daemonService.inspectContainer(containerId).onEach {
      println("STATE: $it ON DOCKER OF ${app.simpleId}")
    }.launchIn(this)

    call.respond(app.state.value.toString())
  }

  webSocket("/apps/{id}/state") {
    val app = call.findAppByParameters()

    app.state.collect { send(it.toString()) }
  }

  webSocket("/apps/{id}/logs") {
    val app = call.findAppByParameters()
  }

  post<Apps.FindById.Kill> {
    val app = call.findAppByParameters()
    val containerId = deployService.findContainerIdByAppId(app.id) ?: return@post

    daemonService.killContainer(containerId)

    call.respond(HttpStatusCode.NoContent)
  }

  post<Apps.FindById.Stop> {
    val app = call.findAppByParameters()
    val containerId = deployService.findContainerIdByAppId(app.id) ?: return@post

    daemonService.stopContainer(containerId)

    call.respond(HttpStatusCode.NoContent)
  }

  post<Apps.FindById.Start> {
    val app = call.findAppByParameters()
    val containerId = deployService.findContainerIdByAppId(app.id) ?: return@post

    daemonService.attach(containerId).launchIn(this)

    call.respond(HttpStatusCode.NoContent)
  }

  post<Apps.FindById.Deploy> {
    val app = call.findAppByParameters()

    deployService.deploy(app, DeployConfig {
      repository = "https://github.com/LorenzooG/happy-nlw"
      memory = 2_480_000L
    })

    call.respond(HttpStatusCode.NoContent)
  }
}
