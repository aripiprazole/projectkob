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