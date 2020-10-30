package com.lorenzoog.projectkob.server.config

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*

fun Application.setupCors() = install(CORS) {
    method(HttpMethod.Options)
    method(HttpMethod.Put)
    method(HttpMethod.Delete)
    method(HttpMethod.Patch)
    method(HttpMethod.Post)

    header(HttpHeaders.ContentType)
    header(HttpHeaders.Authorization)

    allowCredentials = true
    anyHost()
}