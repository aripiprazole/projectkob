package com.lorenzoog.projectkob.daemon.config

import com.github.dockerjava.api.DockerClient
import com.github.dockerjava.core.DefaultDockerClientConfig
import com.github.dockerjava.core.DockerClientConfig
import com.github.dockerjava.core.DockerClientImpl
import com.github.dockerjava.okhttp.OkDockerHttpClient
import com.github.dockerjava.transport.DockerHttpClient
import java.net.URI

fun createDockerClient(config: Config): DockerClient {
  val dockerClientConfig: DockerClientConfig = DefaultDockerClientConfig.createDefaultConfigBuilder()
    .withDockerHost(config.host)
    .build()

  val dockerHttpClient: DockerHttpClient = OkDockerHttpClient.Builder()
    .dockerHost(URI(config.host))
    .build()

  return DockerClientImpl.getInstance(dockerClientConfig, dockerHttpClient)
}