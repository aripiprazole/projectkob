package com.lorenzoog.projectkob.server

import com.lorenzoog.projectkob.daemon.config.createDockerClient
import com.lorenzoog.projectkob.daemon.config.getAppConfig
import com.lorenzoog.projectkob.daemon.services.DaemonService
import com.lorenzoog.projectkob.daemon.services.DeployService
import com.lorenzoog.projectkob.daemon.services.ImageService
import com.lorenzoog.projectkob.server.auth.setupAuthentication
import com.lorenzoog.projectkob.server.config.setupCallLogging
import com.lorenzoog.projectkob.server.config.setupCors
import com.lorenzoog.projectkob.server.config.setupWebSockets
import com.lorenzoog.projectkob.server.database.DatabaseConnector
import com.lorenzoog.projectkob.server.database.koinDatabaseModule
import com.lorenzoog.projectkob.server.routes.setupRouting
import com.lorenzoog.projectkob.server.services.AppService
import com.lorenzoog.projectkob.server.services.SessionService
import io.ktor.application.*
import io.ktor.client.*
import io.ktor.client.engine.apache.*
import io.ktor.client.features.json.*
import io.ktor.client.features.json.serializer.*
import io.ktor.features.*
import io.ktor.locations.*
import io.ktor.serialization.*
import io.ktor.util.*
import kotlinx.serialization.json.Json
import org.koin.dsl.module
import org.koin.ktor.ext.modules

fun main(args: Array<String>): Unit = io.ktor.server.jetty.EngineMain.main(args)


private val json = Json {
  ignoreUnknownKeys = true
}

private val http = HttpClient(Apache) {
  install(JsonFeature) {
    serializer = KotlinxSerializer(json)
  }
}

@Suppress("unused") // Referenced in application.conf
@OptIn(KtorExperimentalAPI::class, ExperimentalStdlibApi::class)
fun Application.module() {
  modules(
    koinDatabaseModule(),
    module {
      single { http }
      single { createDockerClient(getAppConfig()) }
      single { ImageService(get()) }
      single { DaemonService(get()) }
      single { DeployService(get()) }
      single { AppService() }
      single { SessionService() }
    }
  )

  with(DatabaseConnector) { connect() }

  install(Locations)
  install(ConditionalHeaders)
  install(ContentNegotiation) {
    json(json)
  }

  setupWebSockets()
  setupCallLogging()
  setupCors()

  setupAuthentication()
  setupRouting()
}