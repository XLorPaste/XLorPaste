package cn.xlorpaste.jetbrains

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.actionSystem.PlatformDataKeys
import com.intellij.openapi.fileEditor.impl.LoadTextUtil

open class ButtonUploadAction : AnAction() {
  override fun actionPerformed(event: AnActionEvent) {
    val file = event.getData(PlatformDataKeys.VIRTUAL_FILE) ?: return
    val filename = file.name
    val extension = file.fileType.defaultExtension.ifEmpty {
      val list = filename.split(".")
      if (list.size > 1) {
        list.last()
      } else {
        "text"
      }
    }
    val content = LoadTextUtil.loadText(file).toString()

    Client(event.project).upload(filename, content, extension)
  }
}
