package com.lorenzoog.projectkob.core.dtos

import kotlinx.serialization.Serializable

@Serializable
data class Page<T>(
    val items: Collection<T>,
    val pages: Int,
    val currentPage: Int,
)

fun <T> Collection<T>.asPage(pages: Number, currentPage: Int = 1): Page<T> {
    return Page(this, pages.toInt(), currentPage)
}

inline fun <T, R> Page<T>.map(func: (T) -> R): Page<R> {
    return Page(items.map(func), pages, currentPage)
}