package cn.xlorpaste.jetbrains

import com.intellij.notification.*
import com.intellij.openapi.actionSystem.AnActionEvent
import icons.PasteIcons
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.gson.*
import kotlinx.coroutines.runBlocking
import java.awt.Toolkit
import java.awt.datatransfer.StringSelection
import java.time.LocalDateTime
import java.util.*

/**
 * This should sync with https://github.com/XLorPaste/XLorPaste/blob/main/packages/cli/src/client.ts
 */
class Client {
  companion object {
    const val DEFAULT_XLORPASTE_FRONTEND_URL = "https://xlorpaste.cn"

    const val DEFAULT_XLORPASTE_API_URL = "https://paste.cpany.dev"

    const val MAX_BODY_LENGTH = 1048576

    private fun http() = HttpClient(CIO) {
      install(ContentNegotiation) {
        gson()
      }
    }

    private val encoder = Base64.getEncoder()

    private val decoder = Base64.getDecoder()

    fun encode(text: String) = encoder.encodeToString(text.toByteArray())!!

    fun decode(text: String) = decoder.decode(text).toString()

    private fun notifySubmission(response: UploadResponse) {
      val link = "$DEFAULT_XLORPASTE_FRONTEND_URL/${response.token}"

      val notification =
        NotificationGroupManager.getInstance().getNotificationGroup("XLorPaste")
          .createNotification(
            "Your code token is <a href=\"$link\">${response.token}</a>",
            NotificationType.INFORMATION
          ).setTitle("Upload to XLorPaste OK")
          .setIcon(PasteIcons.Upload)
          .addAction(object : NotificationAction("Copy link") {
            override fun actionPerformed(
              e: AnActionEvent,
              notification: Notification,
            ) {
              val selection = StringSelection(link)
              Toolkit.getDefaultToolkit().systemClipboard.setContents(
                selection, selection
              )
            }
          })

      Notifications.Bus.notify(notification)
    }
  }

  fun upload(body: String, lang: String): UploadResponse? {
    if (body.length > MAX_BODY_LENGTH) {
      return null
    }

    val response = runBlocking {
      http().use {
        it.post("${DEFAULT_XLORPASTE_API_URL}/") {
          val payload =
            Payload(encode(body), lang, LocalDateTime.now().toString())
          contentType(ContentType.Application.Json)
          setBody(payload)
        }
      }.body<UploadResponse>()
    }

    notifySubmission(response)

    return response
  }


  /**
   * Refer: https://github.com/XLorPaste/XLorPaste/blob/a0a57053256a77aa4498fc16b965f6167a870a17/packages/cli/src/types.ts#L5-L12
   */

  data class Payload(val body: String, val lang: String, val timestamp: String)

  /**
   * Refer: https://github.com/XLorPaste/XLorPaste/blob/a0a57053256a77aa4498fc16b965f6167a870a17/packages/cli/src/types.ts#L14-L20
   */
  data class UploadResponse(
    val timestamp: String,
    val token: String,
    val delete: String,
    val once: String?,
  )
}
