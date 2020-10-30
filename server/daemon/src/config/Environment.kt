package com.lorenzoog.projectkob.daemon.config

data class Config(
    val host: String
)

fun getAppConfig(): Config {
    return Config(host = "unix:///var/run/docker.sock")
//    return Config(host = "tcp://0.0.0.0:2375")
}