val exposedVersion: String by project

plugins {
  kotlin("jvm")
  kotlin("plugin.serialization")
}

group = "com.lorenzoog"
version = "0.0.1"

dependencies {
  api(kotlin("stdlib"))
  api("org.jetbrains.kotlinx:kotlinx-serialization-json:1.0.0")
  api("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9")

  api("org.jetbrains.exposed:exposed-core:$exposedVersion")
  api("org.jetbrains.exposed:exposed-jodatime:$exposedVersion")
  api("org.jetbrains.exposed:exposed-dao:$exposedVersion")
  api("org.jetbrains.exposed:exposed-jdbc:$exposedVersion")
}

kotlin.sourceSets["main"].kotlin.srcDirs("src")
kotlin.sourceSets["test"].kotlin.srcDirs("test")

sourceSets["main"].resources.srcDirs("resources")
sourceSets["test"].resources.srcDirs("testresources")
