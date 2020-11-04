package com.lorenzoog.projectkob.server.utils.serializers

import io.ktor.auth.OAuthAccessTokenResponse.*
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

fun OAuth2.asJsonObject() = buildJsonObject {
  put("expiresIn", expiresIn)
  put("accessToken", accessToken)
  put("refreshToken", refreshToken)
  put("tokenType", tokenType)
}