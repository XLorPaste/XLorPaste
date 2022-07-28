package cn.xlorpaste.jetbrains

import com.intellij.openapi.actionSystem.AnAction
import com.intellij.openapi.actionSystem.AnActionEvent
import com.intellij.openapi.actionSystem.PlatformDataKeys
import com.intellij.openapi.fileEditor.impl.LoadTextUtil

open class ButtonUploadAction : AnAction() {
  override fun actionPerformed(event: AnActionEvent) {
    val file = event.getData(PlatformDataKeys.VIRTUAL_FILE) ?: return
    val extension = file.fileType.defaultExtension
    val content = LoadTextUtil.loadText(file).toString()
    println("Start uploading...")
    val sub = Client().upload(content, extension)
    println(sub)
  }
}
