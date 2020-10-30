package com.lorenzoog.projectkob.server.config

import io.ktor.application.*
import io.ktor.http.cio.websocket.*
import io.ktor.websocket.*
import java.time.Duration

fun Application.setupWebSockets() = install(WebSockets) {
    pingPeriod = Duration.ofSeconds(60)
    timeout = Duration.ofSeconds(15)
    maxFrameSize = Long.MAX_VALUE // Disabled (max value). The connection will be closed if surpassed this length.
    masking = false
}