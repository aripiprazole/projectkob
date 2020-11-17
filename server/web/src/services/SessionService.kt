package com.lorenzoog.projectkob.server.services

import com.lorenzoog.projectkob.server.dtos.GithubRepository
import com.lorenzoog.projectkob.server.dtos.GithubUser
import com.lorenzoog.projectkob.server.models.Repository
import com.lorenzoog.projectkob.server.models.User
import com.lorenzoog.projectkob.server.models.asRepository
import com.lorenzoog.projectkob.server.models.asUser
import io.ktor.client.*
import io.ktor.client.features.*
import io.ktor.client.request.*
import io.ktor.http.*
import org.koin.core.KoinComponent
import org.koin.core.inject

const val GITHUB_USER_URL = "https://api.github.com/user"
const val GITHUB_REPOS_URL = "https://api.github.com/user/repos"

interface SessionService {
  suspend fun isTokenValid(token: String): Boolean
  suspend fun findUserByToken(token: String): User
  suspend fun findUserRepos(token: String): Collection<Repository>
}

@Suppress("FunctionName")
fun SessionService(): SessionService = SessionServiceImpl()

private class SessionServiceImpl : KoinComponent, SessionService {
  private val client by inject<HttpClient>()

  override suspend fun isTokenValid(token: String): Boolean = try {
    findUserByToken(token)
    true
  } catch (exception: ClientRequestException) {
    false
  }

  override suspend fun findUserByToken(token: String): User {
    return client.get<GithubUser>(GITHUB_USER_URL) {
      header(HttpHeaders.Authorization, token)
    }.asUser()
  }

  override suspend fun findUserRepos(token: String): Collection<Repository> {
    return client.get<List<GithubRepository>>(GITHUB_REPOS_URL) {
      header(HttpHeaders.Authorization, token)
    }.map {
      it.asRepository()
    }
  }
}