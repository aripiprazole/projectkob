package com.lorenzoog.projectkob.server.utils.serializers

import com.lorenzoog.projectkob.core.dtos.Page
import kotlinx.serialization.json.*

inline fun <reified T> Page<T>.asJsonObject() = buildJsonObject {
  put("items", buildJsonArray {
    for (value in items) {
      add(Json.encodeToJsonElement(value))
    }
  })
  put("pages", pages)
  put("currentPage", currentPage)
}