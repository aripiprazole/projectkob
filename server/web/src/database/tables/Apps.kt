package com.lorenzoog.projectkob.server.database.tables

import org.jetbrains.exposed.dao.id.UUIDTable

object Apps : UUIDTable("apps") {
  val name = varchar("name", 32)
  val image = varchar("image", 24)
}