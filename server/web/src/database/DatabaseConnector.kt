package com.lorenzoog.projectkob.server.database

import com.lorenzoog.projectkob.server.database.tables.Apps
import com.lorenzoog.projectkob.server.utils.Connector
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.application.*
import io.ktor.util.*
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import org.koin.core.KoinComponent
import org.koin.core.inject
import org.koin.dsl.module

object DatabaseConnector : Connector, KoinComponent {
    private val tables = arrayOf(Apps)
    private val database by inject<Database>()

    @OptIn(KtorExperimentalAPI::class)
    override fun Application.connect(): Unit = transaction(database) {
        SchemaUtils.createMissingTablesAndColumns(*tables)
    }
}

@OptIn(KtorExperimentalAPI::class)
fun Application.koinDatabaseModule() = module {
    environment.config.config("database").run {
        single {
            Database.connect(HikariDataSource(HikariConfig().apply {
                jdbcUrl = property("jdbc-url").getString()
                username = property("user").getString()
                password = property("password").getString()
                driverClassName = property("driver").getString()
                maximumPoolSize = propertyOrNull("maximum-pool-size")?.getString()?.toInt() ?: 8
            }))
        }
    }
}
