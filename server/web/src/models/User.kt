package com.lorenzoog.projectkob.server.models

import com.lorenzoog.projectkob.server.dtos.GithubRepository
import com.lorenzoog.projectkob.server.dtos.GithubUser
import kotlinx.serialization.Serializable

@Serializable
data class User(
  val id: Long,
  val username: String,
  val avatar: String
)

@Serializable
data class Repository(
  val name: String,
  val url: String,
  val isPrivate: Boolean,
  val isValid: Boolean,
)

fun GithubUser.asUser() = User(
  id, login, avatarUrl
)

fun GithubRepository.asRepository() = Repository(
  fullName, htmlUrl, private, permissions.pull
)
