import { PluginInterface } from '../interface'
import type { Node as ProseMirrorNode } from 'prosemirror-model'
import {
  px,
  getRelatviePosition,
  isBoxHasTwoSideIntersaction,
  isBoxIntersection,
  getCommonParent,
  isContainerNode
} from '../utils'

import { NodeRangeSelection } from './NodeRangeSelection'
import { throttle } from 'lodash'
import type { Position, BoxRect, Range, NodePos } from '../types'
import { PluginIDEnum } from '../types'
import type { EditorView } from 'prosemirror-view'

const IgnoreContainer = ['textList', 'table']

const ROOT_ADD_CLASSNAME = 'start-editor-is_box_selecting'

export class BoxSelectNodePlugin extends PluginInterface {
  ID = PluginIDEnum.BOX_SELECT_NODE

  get plugins() {
    return []
  }

  anchor: Position = { left: 0, top: 0 }
  head: Position = { left: 0, top: 0 }
  showSelectBox = false
  timeoutHandler: any = undefined

  throttleSelectNode = throttle(this.selectNode, 100)
  selectBox!: { show: any; hide: any; update: any }

  get editorContainer() {
    return this.editor.container
  }

  get wrapConatainer() {
    return this.editor.wrap
  }

  get startPos(): Position {
    const { anchor, head } = this
    return {
      left: Math.min(anchor.left, head.left),
      top: Math.min(anchor.top, head.top)
    }
  }

  get endPos(): Position {
    const { anchor, head } = this
    return {
      left: Math.max(anchor.left, head.left),
      top: Math.max(anchor.top, head.top)
    }
  }

  get scrollTop() {
    return this.editorContainer?.scrollTop
  }

  mounted() {
    this.onMousedown = this.onMousedown.bind(this)
    this.onMousemove = this.onMousemove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
    this.onClick = this.onClick.bind(this)
    this.wrapConatainer.addEventListener('mousedown', this.onMousedown)
    this.wrapConatainer.addEventListener('contextmenu', this.onContextmenu)
    this.selectBox = this.createSelectBox(this.wrapConatainer)
  }

  destroy() {
    this.wrapConatainer.removeEventListener('mousedown', this.onMousedown)
  }

  createSelectBox(wrapConatainer: HTMLElement) {
    const ele = document.createElement('div')
    ele.classList.add('start-editor-select_box')
    wrapConatainer.appendChild(ele)
    return {
      show() {
        this.update()
        ele.style.display = 'block'
        wrapConatainer.classList.add(ROOT_ADD_CLASSNAME)
      },
      update: () => {
        const { startPos, endPos } = this
        ele.style.left = px(startPos.left)
        ele.style.top = px(startPos.top)
        ele.style.width = px(Math.abs(endPos.left - startPos.left))
        ele.style.height = px(Math.abs(endPos.top - startPos.top))
      },
      hide() {
        ele.style.display = 'none'
        wrapConatainer.classList.remove(ROOT_ADD_CLASSNAME)
      }
    }
  }

  onContextmenu(e: Event) {
    e.preventDefault()
  }

  onMousedown(e: MouseEvent) {
    if (
      e.target === this.editor.shell ||
      this.editor.shell.contains(e.target as HTMLElement)
    )
      return
    this.timeoutHandler = setTimeout(() => {
      clearTimeout(this.timeoutHandler)
      // this.editor.tooltips?.nodeMenu.show(false);
      this.showSelectBox = true
      this.selectBox.show()
      this.wrapConatainer.addEventListener('click', this.onClick)
    }, 200)
    this.anchor = this.getRelatviePosition({ left: e.clientX, top: e.clientY })
    const conatiner = this.wrapConatainer as HTMLElement
    document.addEventListener('mouseup', this.onMouseup)
    conatiner.addEventListener('mousemove', this.onMousemove)
    e.preventDefault()
  }
  onMousemove(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.head = this.getRelatviePosition({ left: e.clientX, top: e.clientY })
    this.throttleSelectNode()
    this.selectBox.update()

    if (e.clientY + 50 > window.innerHeight) {
      this.editorContainer.scrollTop += 5
    } else if (e.clientY < 50) {
      this.editorContainer.scrollTop -= 5
    }
  }

  onMouseup(e: MouseEvent) {
    clearTimeout(this.timeoutHandler)
    this.showSelectBox = false
    this.selectBox.hide()
    const conatiner = this.wrapConatainer as HTMLElement
    document.removeEventListener('mouseup', this.onMouseup)
    conatiner.removeEventListener('mousemove', this.onMousemove)
    const { selection } = this.editor.state
    if (
      selection instanceof NodeRangeSelection &&
      selection.from !== selection.to
    ) {
      this.editor.isFocus = true
    }
  }

  getRelatviePosition(pos: Position) {
    return getRelatviePosition(this.wrapConatainer as HTMLElement, pos)
  }

  onClick(e: Event) {
    this.wrapConatainer.removeEventListener('click', this.onClick)
    // 阻止editor文件中isDocClick处理isEditorFocus逻辑，框选需要手动处理这些逻辑
    e.stopPropagation()
  }

  getNangePos(): Range {
    const {
      editor: { view, shell },
      startPos,
      endPos
    } = this
    const relative = getRelatviePosition(document.body, this.wrapConatainer)
    const absoluteStartPos = {
      left: relative.left + startPos.left,
      top: startPos.top + relative.top
    }
    const absoluteEndPos = {
      left: relative.left + endPos.left,
      top: endPos.top + relative.top
    }
    const rect = shell.getBoundingClientRect()
    if (
      (absoluteStartPos.left < rect.left && absoluteEndPos.left < rect.left) ||
      (absoluteStartPos.left > rect.right && absoluteEndPos.left > rect.right)
    ) {
      return { from: 0, to: 0 }
    }
    const boxRect = {
      left: absoluteStartPos.left,
      right: absoluteEndPos.left,
      top: absoluteStartPos.top,
      bottom: absoluteEndPos.top
    }
    const startInfo = view.posAtCoords({
      left: Math.max(rect.left, absoluteStartPos.left),
      top: Math.max(absoluteStartPos.top, rect.top)
    })
    const endInfo = view.posAtCoords({
      left: Math.min(absoluteEndPos.left, rect.right),
      top: Math.min(absoluteEndPos.top, rect.bottom)
    })
    if (!startInfo || !endInfo) return { from: 0, to: 0 }
    if (boxRect.left <= rect.left && boxRect.right >= rect.right) {
      return { from: startInfo.pos, to: endInfo.pos }
    }

    const startResolvedPos = view.state.doc.resolve(startInfo.pos)
    const endResolvedPos = view.state.doc.resolve(endInfo.pos)

    const isLeftToRight = absoluteStartPos.left < rect.left
    let isInContainer = false
    let currentNode = null
    let currentNodePos = -1
    if (isLeftToRight) {
      currentNode = startResolvedPos?.nodeAfter as ProseMirrorNode
      currentNodePos = startResolvedPos.pos
      isInContainer =
        currentNode &&
        !IgnoreContainer.includes(currentNode.type.name) &&
        isContainerNode(currentNode) &&
        getCommonParent(
          view.state.doc.resolve(startResolvedPos.pos + 1),
          endResolvedPos
        ).node === currentNode
    } else {
      currentNode = endResolvedPos.nodeBefore as ProseMirrorNode
      currentNodePos = endResolvedPos.pos - currentNode?.nodeSize
      isInContainer =
        currentNode &&
        !IgnoreContainer.includes(currentNode.type.name) &&
        isContainerNode(currentNode) &&
        getCommonParent(
          startResolvedPos,
          view.state.doc.resolve(endResolvedPos.pos - 1)
        ).node === currentNode
    }
    if (isInContainer) {
      return (
        getRangeInContainer(
          view,
          {
            node: currentNode,
            pos: currentNodePos
          },
          boxRect,
          isLeftToRight
        ) || {
          from: 0,
          to: 0
        }
      )
    } else {
      return getRange(view, boxRect) || { from: 0, to: 0 }
    }
  }

  selectNode() {
    const { view, state } = this.editor
    const range = this.getNangePos()
    if (this.showSelectBox) {
      view.dispatch(
        state.tr.setSelection(
          NodeRangeSelection.create(state.tr.doc, range.from, range.to)
        )
      )
    }
  }
}

function getRangeInContainer(
  view: EditorView,
  nodePos: NodePos,
  boxRect: BoxRect,
  isLeftToRight = true
): Range | null {
  const newNodePoses: NodePos[] = []
  let from = -1
  let to = -1
  nodePos.node.forEach((node, offset) => {
    const pos = nodePos.pos + offset + 1
    const dom = view.nodeDOM(pos) as HTMLElement
    const rect = dom?.getBoundingClientRect()
    if (!rect) return false
    const isIntersact = isContainerNode(node)
      ? hasIntersactWithContainer(
          view,
          { node, pos },
          boxRect,
          from !== -1 && isLeftToRight
        )
      : isBoxIntersection(boxRect, rect)
    if (isIntersact) {
      if (from === -1) {
        from = pos
        if (!isLeftToRight && newNodePoses.length) {
          const lastNodePos = newNodePoses[newNodePoses.length - 1]
          if (hasIntersactWithContainer(view, lastNodePos, boxRect))
            from = lastNodePos.pos
        }
      }
      to = pos + node.nodeSize
    }
    if (isContainerNode(node)) {
      newNodePoses.push({ node, pos })
    }
  })
  if (from !== -1) return { from, to }
  for (const sonNodePos of newNodePoses) {
    const newRange = getRangeInContainer(
      view,
      sonNodePos,
      boxRect,
      isLeftToRight
    )
    if (newRange) {
      return newRange
    }
  }
  return null
}

function hasIntersactWithContainer(
  view: EditorView,
  nodePos: NodePos,
  boxRect: BoxRect,
  checkSon = true
) {
  const dom = view.nodeDOM(nodePos.pos) as HTMLElement
  const rect = dom?.getBoundingClientRect()
  if (rect && isBoxHasTwoSideIntersaction(boxRect, rect)) return true
  if (!checkSon) return false

  let hasIntersact = false

  nodePos.node.descendants((node, pos) => {
    if (hasIntersact || node.isText) return false
    pos = pos + nodePos.pos + 1
    const dom = view.nodeDOM(pos) as HTMLElement
    const rect = dom?.getBoundingClientRect()
    if (!rect) return false
    hasIntersact = isContainerNode(node)
      ? isBoxHasTwoSideIntersaction(boxRect, rect)
      : isBoxIntersection(boxRect, rect)
  })
  return hasIntersact
}

function getRange(view: EditorView, boxRect: BoxRect) {
  let from = -1
  let to = -1
  let isIntersact = false
  view.state.doc.forEach((node, pos) => {
    if (isContainerNode(node)) {
      isIntersact = hasIntersactWithContainer(
        view,
        { node, pos },
        boxRect,
        false
      )
    } else {
      const dom = view.nodeDOM(pos) as HTMLElement
      const rect = dom?.getBoundingClientRect()
      isIntersact = rect && isBoxIntersection(boxRect, rect)
    }
    if (isIntersact) {
      if (from === -1) {
        from = pos
      }
      to = pos + node.nodeSize
    }
    return false
  })
  if (from === -1) return null
  return { from, to }
}

export const boxSelectPlugin = () => {
  return new BoxSelectNodePlugin()
}
