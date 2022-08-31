import { NodeSelection, Plugin, EditorState } from 'prosemirror-state'
import { DecorationSet, Decoration } from 'prosemirror-view'
import { getNodeByEvent, isCtrlKey, isContainerNode } from '../utils'
import NodeRangeSelection from './NodeRangeSelection'
import { PluginInterface } from '../interface'
import { PluginIDEnum } from '../types'

const SELECTED_NODE_CLASSNAME = 'ProseMirror-selectednode'

export class NodeSelectPlugin extends PluginInterface {
  ID = PluginIDEnum.NODE_SELECT

  getFocusNodeDecorationSet(state: EditorState) {
    const sel = state.selection
    if (!(sel instanceof NodeRangeSelection)) return DecorationSet.empty
    const decorations: Decoration[] = []
    const parent = sel.$from.parent
    const parentPos = sel.$from.start(sel.$from.depth)
    parent.descendants((node, pos) => {
      pos += parentPos
      if (!node.isText && pos >= sel.from && pos + node.nodeSize <= sel.to) {
        decorations.push(
          Decoration.node(pos, pos + node.nodeSize, {
            class: SELECTED_NODE_CLASSNAME
          })
        )
      }
      return false
    })

    return DecorationSet.create(state.doc, decorations)
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          decorations: (state) => {
            return this.getFocusNodeDecorationSet(state)
          },
          handleClick(view, _pos, event) {
            const clickedNode = getNodeByEvent(view, event)
            if (clickedNode === null) {
              return false
            }
            const { node, pos } = clickedNode
            if (!event.shiftKey && !isCtrlKey(event) && isContainerNode(node)) {
              const tr = view.state.tr
              tr.setSelection(NodeSelection.create(view.state.doc, pos))
              view.dispatch(tr)
              return true
            }
            return false
          }
        }
      })
    ]
  }
}
