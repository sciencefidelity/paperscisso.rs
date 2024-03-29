import { NodeSelection, Plugin, EditorState } from 'prosemirror-state'
import { DecorationSet, Decoration, EditorView } from 'prosemirror-view'
import NodeRangeSelection from './NodeRangeSelection'

export const selectedNode = () =>
  new Plugin({
    props: {
      decorations: state => {
        return getFocusNodeDecorationSet(state)
      },
      handleClick(view, _pos, event) {
        const clickedNode = getNodeByEvent(view, event)
        if (clickedNode === null) return false
        const { node, pos } = clickedNode
        if (!event.shiftKey && node.isBlock && !node.isTextblock && !node.isAtom) {
          const tr = view.state.tr
          tr.setSelection(NodeSelection.create(view.state.doc, pos))
          view.dispatch(tr)
          return true
        }
        return false
      }
    }
  })

const getFocusNodeDecorationSet = (state: EditorState) => {
  const sel = state.selection
  if (!(sel instanceof NodeRangeSelection)) return DecorationSet.empty
  const decorations: Decoration[] = []
  const parent = sel.$from.parent
  const parentPos = sel.$from.start(sel.$from.depth)
  parent.descendants((node, pos) => {
    pos += parentPos
    if (!node.isText && pos >= sel.from && pos + node.nodeSize <= sel.to) {
      decorations.push(Decoration.node(pos, pos + node.nodeSize, { class: 'ProseMirror-selectednode' }))
    }
    return false
  })
  return DecorationSet.create(state.doc, decorations)
}

const getNodeByEvent = (view: EditorView, event: MouseEvent) => {
  const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })
  if (!pos) return null
  if (pos.inside === -1) return null
  const $pos = view.state.doc.resolve(pos.inside)
  if (!$pos.nodeAfter) return null
  return { node: $pos.nodeAfter, pos: $pos.before($pos.depth + 1) }
}
