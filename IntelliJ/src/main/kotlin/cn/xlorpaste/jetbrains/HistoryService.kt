package cn.xlorpaste.jetbrains

import com.intellij.openapi.components.PersistentStateComponent
import com.intellij.openapi.components.State

@State(name = "History")
class HistoryService : PersistentStateComponent<HistoryService.HistoryState> {
  data class HistoryState(val codes: List<String>)

  private var state: HistoryState? = null

  override fun getState(): HistoryState? {
    return state
  }

  override fun loadState(state: HistoryState) {
    this.state = state
  }
}
