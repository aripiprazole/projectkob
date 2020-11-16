@file:OptIn(KtorExperimentalLocationsAPI::class)

package com.lorenzoog.projectkob.server.routes.apps

import com.lorenzoog.projectkob.core.dtos.map
import com.lorenzoog.projectkob.core.dtos.toResponseDto
import com.lorenzoog.projectkob.core.services.AppService
import com.lorenzoog.projectkob.server.auth.authenticated
import io.ktor.application.*
import io.ktor.locations.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.*
import org.koin.ktor.ext.inject

const val TOTAL_PAGES_HEADER = "X-Total-Pages"

@OptIn(KtorExperimentalLocationsAPI::class, KtorExperimentalAPI::class)
fun Route.appsRoutes() = authenticated {
  val appService by inject<AppService>()

  post<Apps> {
    call.respond(appService.create(call.receive()).toResponseDto())
  }

  get<Apps.Index> { (page) ->
    val (items, totalPages) = appService.findPaginated(page).map {
      it.toResponseDto()
    }

    call.response.header(TOTAL_PAGES_HEADER, totalPages)
    call.respond(items)
  }

  get<Apps.FindById> {
    call.respond(call.findAppByParameters().toResponseDto())
  }
}
