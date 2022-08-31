import { Plugin, PluginKey } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'

export const menuPlugin = () => {
  return new Plugin({
    key: new PluginKey('menu'),
    view(editorView) {
      return new MenuView(editorView)
    }
  })
}

class MenuView {
  _view: EditorView
  menu: HTMLDivElement
  constructor(view: EditorView) {
    this._view = view
    this.menu = document.createElement('div')
    this.menu.className = 'menu'
    this.menu.innerHTML = 'menu'
    view.dom.parentNode?.insertBefore(this.menu, view.dom)
  }

  destroy() {
    this.menu.remove()
  }
}
