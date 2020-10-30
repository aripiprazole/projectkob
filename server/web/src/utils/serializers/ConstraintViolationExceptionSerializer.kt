package com.lorenzoog.projectkob.server.utils.serializers

import com.lorenzoog.projectkob.server.utils.put
import kotlinx.serialization.json.buildJsonArray
import kotlinx.serialization.json.buildJsonObject
import org.valiktor.ConstraintViolationException

fun ConstraintViolationException.asJsonObject() = buildJsonObject {
    put("type", "constraint.violation.exception")
    put("message", "Could not process the entity. Check the violations")
    put("violations", buildJsonArray {
        for (violation in constraintViolations) {
            add(violation.asJsonObject())
        }
    })
}