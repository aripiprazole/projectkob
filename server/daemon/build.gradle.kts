plugins {
    kotlin("jvm")
    kotlin("plugin.serialization")
}

group = "com.lorenzoog"
version = "1.0-SNAPSHOT"

dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.0.0")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.3.9")

    api("br.com.devsrsouza.eventkt:eventkt-core-jvm:0.2.0-SNAPSHOT")

    implementation(project(":logger"))
    implementation(project(":core"))

    api("com.github.docker-java:docker-java:3.2.5")
    api("com.github.docker-java:docker-java-transport-okhttp:3.2.5")

    implementation("org.eclipse.jgit:org.eclipse.jgit:5.9.0.202009080501-r")

    implementation("ch.qos.logback:logback-classic:1.3.0-alpha5")

    testImplementation(kotlin("test-junit"))
}

kotlin.sourceSets["main"].kotlin.srcDirs("src")
kotlin.sourceSets["test"].kotlin.srcDirs("test")

sourceSets["main"].resources.srcDirs("resources")
sourceSets["test"].resources.srcDirs("testresources")
