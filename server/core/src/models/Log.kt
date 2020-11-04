package com.lorenzoog.projectkob.core.models

data class Log(val message: String, val type: LogType) {
  companion object
}

enum class LogType(private val raw: String) {
  Info("Stdout"), Error("Stderr"),
  Input("Stdin"), None("None"),
  Warning("warning");

  override fun toString() = raw
}


