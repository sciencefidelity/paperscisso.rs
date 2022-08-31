import { NodeSelection, Plugin, EditorState } from 'prosemirror-state'
import { DecorationSet, Decoration, EditorView } from 'prosemirror-view'
import type { NodePos } from 'src/types'

/**
 * a non-atom node needs to be selected by pressing the command key
 * after expansion, click on the container node will be selected
 */
export const getNodeSelection = () =>
  new Plugin({
    props: {
      decorations: state => {
        return getFocusNodeDecorationSet(state)
      },
      handleClick(view, _pos, event) {
        const clickedNode = getNodeByEvent(view, event)
        if (clickedNode === null) {
          return false
        }
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
  const { selection } = state
  // if (!(sel instanceof NodeRangeSelection)) return DecorationSet.empty
  const decorations: Decoration[] = []
  const parent = selection.$from.parent
  const parentPos = selection.$from.start(selection.$from.depth)
  parent.descendants((node, pos) => {
    pos += parentPos
    if (!node.isText && pos >= selection.from && pos + node.nodeSize <= selection.to) {
      decorations.push(Decoration.node(pos, pos + node.nodeSize, { class: 'ProseMirror-selectednode' }))
    }
    return false
  })
  return DecorationSet.create(state.doc, decorations)
}

const getNodeByEvent = (view: EditorView, event: MouseEvent): NodePos | null => {
  const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })
  if (!pos) return null
  if (pos.inside === -1) return null
  const $pos = view.state.doc.resolve(pos.inside)
  if (!$pos.nodeAfter) return null
  return {
    node: $pos.nodeAfter,
    pos: $pos.before($pos.depth + 1)
  }
}
