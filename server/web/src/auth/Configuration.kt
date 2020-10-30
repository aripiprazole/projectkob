package com.lorenzoog.projectkob.server.auth

import com.lorenzoog.projectkob.server.models.GithubUser
import com.lorenzoog.projectkob.server.services.SessionService
import io.ktor.application.*
import io.ktor.auth.*
import io.ktor.request.*
import io.ktor.routing.*
import io.ktor.util.*
import org.koin.ktor.ext.get
import org.koin.ktor.ext.inject

@OptIn(KtorExperimentalAPI::class)
fun Application.setupAuthentication() = authentication {
    environment.config.config("github-oauth").run {
        oauth {
            providerLookup = {
                OAuthServerSettings.OAuth2ServerSettings(
                    name = "github",
                    authorizeUrl = "https://github.com/login/oauth/authorize",
                    accessTokenUrl = "https://github.com/login/oauth/access_token",
                    clientId = property("client-id").getString(),
                    clientSecret = property("client-secret").getString(),
                    defaultScopes = listOf("repo_deployment", "repo")
                )
            }
            client = get()
            urlProvider = { property("redirect-url").getString() }
        }
    }
}

const val DEFAULT_TOKEN = ""

private class AuthenticatedRouteSelector :
    RouteSelector(RouteSelectorEvaluation.qualityConstant) {

    override fun evaluate(context: RoutingResolveContext, segmentIndex: Int) =
        RouteSelectorEvaluation.Constant
}

@Suppress("EXPERIMENTAL_API_USAGE")
fun Route.authenticated(route: Route.() -> Unit): Route {
    val sessionService by inject<SessionService>()

    return createChild(AuthenticatedRouteSelector()).apply {
        intercept(ApplicationCallPipeline.Features) {
            sessionService.validateToken(call.request.authorization().orEmpty())
        }
    }.apply(route)
}

@OptIn(KtorExperimentalAPI::class)
suspend fun ApplicationCall.findLoggedUser(): GithubUser {
    return application.get<SessionService>().findUserByToken(
        request.authorization().orEmpty()
    )
}