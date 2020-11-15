package com.lorenzoog.projectkob.server.models

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
data class Repo(
  val id: Long,
  @SerialName("full_name")
  val name: String,
  val private: Boolean,
  @SerialName("html_url")
  val htmlUrl: String,
  val permissions: Permissions,
)

@Serializable
data class Permissions(
  val admin: Boolean,
  val push: Boolean,
  val pull: Boolean
)