@file:OptIn(KtorExperimentalLocationsAPI::class)

package com.lorenzoog.projectkob.server.routes.apps

import com.lorenzoog.projectkob.core.models.App
import com.lorenzoog.projectkob.core.services.AppService
import io.ktor.application.*
import io.ktor.locations.*
import io.ktor.util.*
import org.koin.ktor.ext.inject

@Location("/apps")
class Apps {
  @Location("/")
  data class Index(val page: Int = 1, val apps: Apps)

  @Location("/{id}")
  data class Id(val id: String, val apps: Apps) {
    @Location("/stop")
    data class Stop(val id: Id)

    @Location("/start")
    data class Start(val id: Id)

    @Location("/kill")
    data class Kill(val id: Id)

    @Location("/deploy")
    data class Deploy(val id: Id)
  }
}

@OptIn(KtorExperimentalAPI::class)
suspend fun ApplicationCall.findAppByParameters(): App {
  val id: String by parameters
  val appService by application.inject<AppService>()

  return appService.findAppById(id)
}