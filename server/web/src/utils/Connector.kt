package com.lorenzoog.projectkob.server.utils

import io.ktor.application.*

interface Connector {
  fun Application.connect()
}