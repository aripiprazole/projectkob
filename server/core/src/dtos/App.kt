package com.lorenzoog.projectkob.core.dtos

import com.lorenzoog.projectkob.core.models.App
import kotlinx.serialization.Serializable

fun App.toResponseDto() = AppResponseDto(id, name, repository)

@Serializable
data class AppResponseDto(
  val id: String,
  val name: String,
  val repository: String
)

@Serializable
data class AppCreateDto(
  val name: String,
  val repository: String
)
