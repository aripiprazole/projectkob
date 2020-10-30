package com.lorenzoog.projectkob.server.utils.serializers

import com.lorenzoog.projectkob.server.utils.put
import kotlinx.serialization.json.buildJsonObject
import org.valiktor.ConstraintViolation

fun ConstraintViolation.asJsonObject() = buildJsonObject {
    put("constraint", constraint.asJsonObject())
    put("property", property)
    put("value", value)
}