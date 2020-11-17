package com.lorenzoog.projectkob.server.dtos

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class GithubUser(
  val id: Long,
  val login: String,

  @SerialName("avatar_url")
  val avatarUrl: String,

  @SerialName("html_url")
  val htmlUrl: String
)

@Serializable
data class GithubRepository(
  @SerialName("full_name")
  val fullName: String,
  val private: Boolean,
  @SerialName("html_url")
  val htmlUrl: String,
  val permissions: GithubPermissions,
)

@Serializable
data class GithubPermissions(
  val admin: Boolean,
  val push: Boolean,
  val pull: Boolean
)