package com.lorenzoog.projectkob.core.dtos

import kotlinx.serialization.Serializable

@Serializable
data class Page<T>(
  val items: Collection<T>,
  val totalPages: Int,
)

fun <T> Collection<T>.asPage(pages: Number): Page<T> {
  return Page(this, pages.toInt())
}

inline fun <T, R> Page<T>.map(func: (T) -> R): Page<R> {
  return Page(items.map(func), totalPages)
}