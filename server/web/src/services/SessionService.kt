package com.lorenzoog.projectkob.server.services

import com.lorenzoog.projectkob.server.AuthorizationException
import com.lorenzoog.projectkob.server.models.GithubUser
import io.ktor.client.*
import io.ktor.client.features.*
import io.ktor.client.request.*
import io.ktor.http.*
import org.koin.core.KoinComponent
import org.koin.core.inject

const val GITHUB_USER_URL = "https://api.github.com/user"

interface SessionService {
  suspend fun validateToken(token: String)
  suspend fun findUserByToken(token: String): GithubUser
}

@Suppress("FunctionName")
fun SessionService(): SessionService = SessionServiceImpl()

private class SessionServiceImpl : KoinComponent, SessionService {
  private val client by inject<HttpClient>()

  override suspend fun validateToken(token: String): Unit = try {
    findUserByToken(token)
    Unit
  } catch (exception: ClientRequestException) {
    throw AuthorizationException()
  }

  override suspend fun findUserByToken(token: String): GithubUser {
    return client.get(GITHUB_USER_URL) {
      header(HttpHeaders.Authorization, token)
    }
  }
}