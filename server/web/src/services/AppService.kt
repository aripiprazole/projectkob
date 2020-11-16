@file:Suppress("NAME_SHADOWING")

package com.lorenzoog.projectkob.server.services

import com.lorenzoog.projectkob.core.dtos.AppCreateDto
import com.lorenzoog.projectkob.core.dtos.asPage
import com.lorenzoog.projectkob.core.models.App
import com.lorenzoog.projectkob.core.services.AppService
import com.lorenzoog.projectkob.core.services.AppService.Companion.PAGE_SIZE
import com.lorenzoog.projectkob.server.EntityNotFoundException
import com.lorenzoog.projectkob.server.database.tables.Apps
import com.lorenzoog.projectkob.server.utils.paginate
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.statements.InsertStatement
import org.jetbrains.exposed.sql.transactions.experimental.newSuspendedTransaction
import org.valiktor.functions.hasSize
import org.valiktor.validate
import java.util.*
import kotlin.math.ceil

@Suppress("FunctionName")
fun AppService(): AppService = CachedAppService(AppServiceImpl())

private class CachedAppService(private val delegate: AppService) : AppService by delegate {
  private val appsCache = mutableMapOf<String, App>()

  override suspend fun findAppById(id: String): App {
    return appsCache.getOrPut(id) {
      delegate.findAppById(id)
    }
  }
}

private class AppServiceImpl : AppService {
  override suspend fun findPaginated(page: Int) = newSuspendedTransaction {
    val page = if (page <= 0) 1 else page
    val allPages = ceil((Apps.selectAll().count() / PAGE_SIZE).toDouble()) + 1

    Apps.selectAll().paginate(page, PAGE_SIZE).map { it.asApp() }
      .asPage(allPages)
  }

  override suspend fun findAppById(id: String) = newSuspendedTransaction {
    Apps.select { Apps.id eq UUID.fromString(id) }.firstOrNull().let {
      it ?: throw EntityNotFoundException()
    }.asApp()
  }

  override suspend fun create(data: AppCreateDto) = newSuspendedTransaction {
    val data = validateAppCreateDto(data)

    Apps.insert {
      it[name] = data.name
      it[repository] = data.repository
    }.asApp()
  }
}

private fun validateAppCreateDto(dto: AppCreateDto) = validate(dto) {
  validate(AppCreateDto::name).hasSize(min = 4, max = 24)
  validate(AppCreateDto::repository).hasSize(min = 4, max = 100)
}

private fun InsertStatement<Number>.asApp(): App {
  return App(
    this[Apps.id].value.toString(),
    this[Apps.name],
    this[Apps.repository]
  )
}

private fun ResultRow.asApp(): App {
  return App(
    this[Apps.id].value.toString(),
    this[Apps.name],
    this[Apps.repository]
  )
}
