@file:OptIn(KtorExperimentalLocationsAPI::class)

package com.lorenzoog.projectkob.server.routes.auth

import com.lorenzoog.projectkob.server.AuthorizationException
import com.lorenzoog.projectkob.server.auth.findLoggedUser
import com.lorenzoog.projectkob.server.utils.serializers.asJsonObject
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.locations.*
import io.ktor.response.*
import io.ktor.routing.*

@OptIn(KtorExperimentalLocationsAPI::class)
fun Route.authRoutes() {
  authenticate {
    get<Login> {
      val principal = call.principal<OAuthAccessTokenResponse.OAuth2>()
        ?: throw AuthorizationException()

      call.respond(principal.asJsonObject())
    }
  }

  get<User> {
    call.respond(call.findLoggedUser())
  }
}

@Location("login")
class Login

@Location("user")
class User