import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
  application
  kotlin("jvm") version "1.4.10"
  kotlin("plugin.serialization") version "1.4.10"
}

group = "com.lorenzoog"
version = "0.0.1"

application {
  mainClassName = "com.lorenzoog.projectkob.server.ApplicationKt"
}

allprojects {
  repositories {
    mavenCentral()
    mavenLocal()
    jcenter()

    maven("https://kotlin.bintray.com/ktor")
    maven("https://oss.sonatype.org/content/repositories/snapshots/")
    maven("http://nexus.devsrsouza.com.br/repository/maven-public/")
  }

  tasks.withType<Test> {
    useJUnitPlatform()
  }

  tasks.withType<KotlinCompile> {
    kotlinOptions.freeCompilerArgs += "-Xopt-in=kotlin.RequiresOptIn"
    kotlinOptions.languageVersion = "1.4"
  }
}

dependencies {
  implementation(kotlin("stdlib-jdk8"))
}

kotlin.sourceSets["main"].kotlin.srcDirs("src")
kotlin.sourceSets["test"].kotlin.srcDirs("test")

sourceSets["main"].resources.srcDirs("resources")
sourceSets["test"].resources.srcDirs("testresources")
