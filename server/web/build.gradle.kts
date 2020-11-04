plugins {
  kotlin("jvm")
  kotlin("plugin.serialization")
}

val ktorVersion: String by project
val kotlinVersion: String by project
val logbackVersion: String by project
val koinVersion: String by project
val commonVersion: String by project
val kotestVersion: String by project
val mockkVersion: String by project
val h2Version: String by project
val postgresqlVersion: String by project
val valiktorVersion: String by project
val amqpVersion: String by project
val theWhiteRabbitVersion: String by project
val hikariVersion: String by project
val firebaseAdminVersion: String by project

group = "com.lorenzoog"
version = "0.0.1"

dependencies {
  // kotlin dependencies
  implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:$kotlinVersion")

  // ktor dependencies
  implementation("io.ktor:ktor-server-jetty:$ktorVersion")
  implementation("io.ktor:ktor-serialization:$ktorVersion")
  implementation("io.ktor:ktor-server-core:$ktorVersion")
  implementation("io.ktor:ktor-locations:$ktorVersion")
  implementation("io.ktor:ktor-websockets:$ktorVersion")
  implementation("io.ktor:ktor-server-host-common:$ktorVersion")
  implementation("io.ktor:ktor-auth:$ktorVersion")

  // project dependencies
  implementation(project(":daemon"))
  implementation(project(":logger"))
  implementation(project(":core"))

  // ktor client dependencies
  implementation("io.ktor:ktor-client-apache:$ktorVersion")
  implementation("io.ktor:ktor-client-serialization-jvm:$ktorVersion")

  // logging dependencies
  implementation("ch.qos.logback:logback-classic:$logbackVersion")

  // validation dependencies
  implementation("org.valiktor:valiktor-core:$valiktorVersion")

  // koin dependencies
  implementation("org.koin:koin-ktor:$koinVersion")
  implementation("org.koin:koin-core:$koinVersion")
  implementation("org.koin:koin-core-ext:$koinVersion")

  // database dependencies
  implementation("com.zaxxer:HikariCP:$hikariVersion")
  runtimeOnly("org.postgresql:postgresql:$postgresqlVersion")

  // amqp client dependencies
  implementation("com.rabbitmq:amqp-client:$amqpVersion")
  implementation("com.viartemev:the-white-rabbit:$theWhiteRabbitVersion")

  // test dependencies
  testRuntimeOnly("com.h2database:h2:$h2Version")
  testImplementation("io.mockk:mockk:$mockkVersion")
  testImplementation("io.ktor:ktor-server-tests:$ktorVersion")

  // kotest dependencies
  testImplementation("io.kotest:kotest-runner-junit5-jvm:$kotestVersion")
  testImplementation("io.kotest:kotest-assertions-core-jvm:$kotestVersion")
  testImplementation("io.kotest:kotest-property-jvm:$kotestVersion")
}

kotlin.sourceSets["main"].kotlin.srcDirs("src")
kotlin.sourceSets["test"].kotlin.srcDirs("test")

sourceSets["main"].resources.srcDirs("resources")
sourceSets["test"].resources.srcDirs("testresources")
