package com.lorenzoog.projectkob.server.database.tables

import org.jetbrains.exposed.dao.id.UUIDTable

object Apps : UUIDTable("apps") {
  val name = varchar("name", 32)
  val repository = varchar("image", 100)
}