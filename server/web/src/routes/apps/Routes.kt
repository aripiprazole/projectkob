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

  @Location("/")
  data class Store(val apps: Apps)

  @Location("/{id}")
  data class FindById(val id: String, val apps: Apps) {
    @Location("/")
    data class Show(val findById: FindById)

    @Location("/stop")
    data class Stop(val findById: FindById)

    @Location("/start")
    data class Start(val findById: FindById)

    @Location("/kill")
    data class Kill(val findById: FindById)

    @Location("/deploy")
    data class Deploy(val findById: FindById)
  }
}

@OptIn(KtorExperimentalAPI::class)
suspend fun ApplicationCall.findAppByParameters(): App {
  val id: String by parameters
  val appService by application.inject<AppService>()

  return appService.findAppById(id)
}