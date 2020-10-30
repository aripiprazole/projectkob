package com.lorenzoog.projectkob.daemon.services

import com.github.dockerjava.api.DockerClient
import com.lorenzoog.projectkob.daemon.utils.suspended
import java.io.File

enum class AppType(val dockerfile: String? = null) {
    Kotlin("kotlin.dockerfile"),
    Postgres()
}

interface ImageService {
    suspend fun findAppTypes(): Collection<AppType>

    suspend fun findImageByAppType(appType: AppType): String
}

@Suppress("FunctionName")
fun ImageService(docker: DockerClient): ImageService {
    return DockerImageService(docker, File("resources"))
}

private class DockerImageService(private val docker: DockerClient, private val resources: File) : ImageService {
    override suspend fun findAppTypes(): Collection<AppType> {
        return AppType.values().toList()
    }

    override suspend fun findImageByAppType(appType: AppType): String {
        val image = docker.buildImageCmd(File(resources, appType.dockerfile)).suspended { item ->
            item.isBuildSuccessIndicated
        }

        return image.imageId
    }
}
