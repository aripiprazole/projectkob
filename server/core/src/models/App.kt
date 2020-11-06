package com.lorenzoog.projectkob.core.models

import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.Channel
import kotlinx.coroutines.flow.MutableStateFlow

data class App(
  val id: String,
  val name: String,
  val image: String = "ubuntu:latest"
) {
  inline val simpleId get() = id.split("-").first()

  @OptIn(ExperimentalCoroutinesApi::class)
  val state = MutableStateFlow<AppState>(AppState.None)

  val logs = Channel<Log>(Channel.UNLIMITED)
}

sealed class AppState(private val raw: String) {
  object Starting : AppState("Starting")
  object Started : AppState("Started")
  object Stopping : AppState("Stopping")
  object Deployed : AppState("Deployed")
  data class Stopped(val code: Long = 0) : AppState("Stopped")

  object None : AppState("None")

  override fun toString() = raw
}
