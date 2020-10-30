package com.lorenzoog.projectkob.server.utils

import org.jetbrains.exposed.sql.Query

fun Query.paginate(page: Int, pageSize: Int) = limit(pageSize, ((page - 1) * pageSize).toLong())