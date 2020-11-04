package com.lorenzoog.projectkob.core.dtos

import com.lorenzoog.projectkob.core.models.App
import kotlinx.serialization.Serializable

fun App.toResponseDto() = AppResponseDto(id, name, image)

@Serializable
data class AppResponseDto(
  val id: String,
  val name: String,
  val image: String
)

@Serializable
data class AppCreateDto(
  val name: String,
  val image: String
)
