package com.lorenzoog.projectkob.server.utils.serializers

import kotlinx.serialization.json.JsonObjectBuilder
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

fun Throwable.asJsonObject(builder: JsonObjectBuilder.() -> Unit = {}) = buildJsonObject {
    put("message", message)

    apply(builder)
}