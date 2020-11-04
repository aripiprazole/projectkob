package com.lorenzoog.projectkob.server.routes

import com.lorenzoog.projectkob.server.AuthenticationException
import com.lorenzoog.projectkob.server.AuthorizationException
import com.lorenzoog.projectkob.server.EntityNotFoundException
import com.lorenzoog.projectkob.server.routes.apps.appsRoutes
import com.lorenzoog.projectkob.server.routes.apps.daemonRoutes
import com.lorenzoog.projectkob.server.routes.auth.authRoutes
import com.lorenzoog.projectkob.server.utils.serializers.asJsonObject
import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*
import org.valiktor.ConstraintViolationException

fun Application.setupRouting() = routing {
  appsRoutes()
  daemonRoutes()
  authRoutes()

  install(StatusPages) {
    exception<AuthorizationException> {
      call.respond(HttpStatusCode.Forbidden)
    }

    exception<AuthenticationException> {
      call.respond(HttpStatusCode.Unauthorized)
    }

    exception<ConstraintViolationException> { cause ->
      call.respond(HttpStatusCode.UnprocessableEntity, cause.asJsonObject())
    }

    exception<EntityNotFoundException> { cause ->
      call.respond(HttpStatusCode.NotFound, cause.asJsonObject())
    }

    exception<Throwable> { cause ->
      call.respond(HttpStatusCode.InternalServerError, cause.asJsonObject())

      throw cause
    }
  }
}