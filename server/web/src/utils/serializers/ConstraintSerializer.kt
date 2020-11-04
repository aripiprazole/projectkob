package com.lorenzoog.projectkob.server.utils.serializers

import com.lorenzoog.projectkob.server.utils.put
import kotlinx.serialization.json.buildJsonObject
import org.valiktor.Constraint

fun Constraint.asJsonObject() = buildJsonObject {
  put("name", name)
  put("parameters", buildJsonObject {
    for ((key, value) in messageParams) {
      put(key, value)
    }
  })
}