import type { Node, Schema } from 'prosemirror-model'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view'

// let _schema: Schema
// let _view: EditorView
const plusIcon = () => {
  const element = document.createElement('button')
  element.className = 'plus-icon'
  element.innerHTML = '➕'
  element.onclick = createNewNode
  return element
}

export const plus: Plugin = new Plugin({
  key: new PluginKey('plus'),
  state: {
    init: (_, { doc }) => plusDecoration(doc),
    apply: (tr, old) => (tr.docChanged ? plusDecoration(tr.doc) : old)
  },
  props: {
    decorations(state) {
      return plus.getState(state)
    }
  }
})

const plusDecoration = (doc: Node) => {
  const decorators: Decoration[] = []
  doc.descendants((node, pos) => {
    if (!node.isBlock) return
    decorators.push(Decoration.widget(pos + 1, plusIcon(), { side: -1 }))
  })
  return DecorationSet.create(doc, decorators)
}

export const createNewNode = () => {
  console.log('click')
}

// export const plus = new Plugin({
//   props: {
//     decorations() {
//       const decorators: Decoration[] = []
//       doc.descendants((node, pos) => {
//         if (!node.isBlock) return
//         decorators.push(Decoration.widget(pos + 1, plusIcon()))
//       })
//       return DecorationSet.create(doc, decorators)
//     }
//   }
// })
