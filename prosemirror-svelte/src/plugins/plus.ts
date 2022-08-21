import { Plugin } from 'prosemirror-state'
import { Decoration, DecorationSet } from 'prosemirror-view'
import { doc } from '../doc'

const plusIcon = () => {
  const element = document.createElement('div')
  element.className = 'plus-icon'
  element.innerHTML = '➕'
  return element
}

export const plus = new Plugin({
  props: {
    decorations() {
      const decorators: Decoration[] = []
      doc.descendants((node, pos) => {
        if (!node.isBlock) return
        decorators.push(Decoration.widget(pos + 1, plusIcon()))
      })
      return DecorationSet.create(doc, decorators)
    }
  }
})
