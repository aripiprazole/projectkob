package com.lorenzoog.projectkob.core.utils

import com.lorenzoog.projectkob.core.models.Log
import com.lorenzoog.projectkob.core.models.LogType
import kotlinx.coroutines.channels.Channel

typealias AppLogger = Channel<Log>

suspend fun AppLogger.error(message: String) = send(Log(message, LogType.Error))
suspend fun AppLogger.info(message: String) = send(Log(message, LogType.Info))
suspend fun AppLogger.input(message: String) = send(Log(message, LogType.Input))
suspend fun AppLogger.none(message: String) = send(Log(message, LogType.None))
suspend fun AppLogger.warning(message: String) = send(Log(message, LogType.Warning))
