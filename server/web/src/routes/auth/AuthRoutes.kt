@file:OptIn(KtorExperimentalLocationsAPI::class)

package com.lorenzoog.projectkob.server.routes.auth

import com.lorenzoog.projectkob.server.AuthorizationException
import com.lorenzoog.projectkob.server.auth.findLoggedUser
import com.lorenzoog.projectkob.server.services.SessionService
import com.lorenzoog.projectkob.server.utils.serializers.asJsonObject
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.locations.*
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.util.*
import org.koin.ktor.ext.inject

@OptIn(KtorExperimentalAPI::class, KtorExperimentalLocationsAPI::class)
fun Route.authRoutes() {
  val sessionService by inject<SessionService>()

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

  get<User.Repos> {
    call.respond(sessionService.findUserRepos(call.request.authorization().orEmpty()))
  }
}

@Location("login")
class Login

@Location("user")
class User {
  @Location("repos")
  data class Repos(val user: User)
}