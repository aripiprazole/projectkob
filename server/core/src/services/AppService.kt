package com.lorenzoog.projectkob.core.services

import com.lorenzoog.projectkob.core.dtos.AppCreateDto
import com.lorenzoog.projectkob.core.dtos.Page
import com.lorenzoog.projectkob.core.models.App

interface AppService {
  suspend fun findPaginated(page: Int): Page<App>
  suspend fun findAppById(id: String): App
  suspend fun create(data: AppCreateDto): App

  companion object {
    const val PAGE_SIZE = 15
  }
}

