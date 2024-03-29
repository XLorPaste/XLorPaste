group = "cn.xlorpaste"
version = "0.1.0"

repositories {
  mavenCentral()
  maven { url = uri("https://maven.pkg.jetbrains.space/public/p/ktor/eap") }
}

plugins {
  val kotlinVersion = "1.6.21"

  id("java")
  id("org.jetbrains.intellij") version "1.10.0"
  kotlin("jvm") version kotlinVersion
  kotlin("plugin.serialization") version kotlinVersion
}

dependencies {
  val ktorVersion = "2.0.3"

  implementation("io.ktor:ktor-client-core:$ktorVersion")
  implementation("io.ktor:ktor-client-cio:$ktorVersion")
  implementation("io.ktor:ktor-client-content-negotiation:$ktorVersion")
  implementation("io.ktor:ktor-serialization-gson:$ktorVersion")
}

// Configure Gradle IntelliJ Plugin
// Read more: https://plugins.jetbrains.com/docs/intellij/tools-gradle-intellij-plugin.html
intellij {
  version.set("2021.3")
  type.set("IC") // Target IDE Platform

  plugins.set(listOf(/* Plugin Dependencies */))
}

tasks {
  // Set the JVM compatibility versions
  withType<JavaCompile> {
    sourceCompatibility = "11"
    targetCompatibility = "11"
  }
  withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions.jvmTarget = "11"
  }

  patchPluginXml {
    sinceBuild.set("213")
    untilBuild.set("223.*")
  }

  signPlugin {
    certificateChain.set(File(System.getenv("CERTIFICATE_CHAIN")).readText())
    privateKey.set(File(System.getenv("PRIVATE_KEY")).readText())
    password.set(System.getenv("PRIVATE_KEY_PASSWORD"))
  }

  publishPlugin {
    token.set(System.getenv("PUBLISH_TOKEN"))
  }
}
