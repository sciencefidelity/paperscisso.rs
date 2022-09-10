import { throttle } from 'lodash'
import type { Node, ResolvedPos } from 'prosemirror-model'
import { Plugin, type PluginView } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'
import NodeRangeSelection from './NodeRangeSelection'

type BoxRect = Omit<Rect, 'width' | 'height'>

export interface NodePos {
  node: Node
  pos: number
}
export interface Position {
  left: number
  top: number
}
interface Range {
  from: number
  to: number
}
interface Rect {
  left: number
  top: number
  width: number
  height: number
  right: number
  bottom: number
}

export function selectionBox(): Plugin {
  return new Plugin({
    view(view) {
      return new SelectionBoxPlugin(view)
    }
  })
}

let timeoutHandler: NodeJS.Timeout

export class SelectionBoxPlugin implements PluginView {
  anchor = { left: 0, top: 0 }
  head = { left: 0, top: 0 }
  showSelectBox = false
  shell: HTMLDivElement | null
  throttleSelectNode = throttle(this.selectNode, 100)
  selectBox!: { show: () => void; hide: () => void; update: () => void }

  get container() {
    return document.getElementById('editor') as HTMLDivElement
  }

  get wrapper() {
    return document.getElementById('editor-wrapper') as HTMLDivElement
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
    return this.container?.scrollTop
  }

  constructor(readonly view: EditorView) {
    this.shell = document.getElementById('editor-shell') as HTMLDivElement
    this.onMousedown = this.onMousedown.bind(this)
    this.onMousemove = this.onMousemove.bind(this)
    this.onMouseup = this.onMouseup.bind(this)
    this.onClick = this.onClick.bind(this)
    this.wrapper.addEventListener('mousedown', this.onMousedown)
    this.wrapper.addEventListener('contextmenu', this.onContextmenu)
    this.selectBox = this.createSelectionBox(this.wrapper)
  }

  destroy() {
    this.wrapper?.removeEventListener('mousedown', this.onMousedown)
  }

  createSelectionBox(wrapper: HTMLDivElement) {
    const element = document.createElement('div')
    element.classList.add('editor-selectbox')
    wrapper.appendChild(element)
    return {
      show() {
        this.update()
        element.style.display = 'block'
        wrapper.classList.add('editor-is_box_selecting')
      },
      update: () => {
        const { startPos, endPos } = this
        element.style.left = `${startPos.left}px`
        element.style.top = `${startPos.top}px`
        element.style.width = `${Math.abs(endPos.left - startPos.left)}px`
        element.style.height = `${Math.abs(endPos.top - startPos.top)}px`
      },
      hide() {
        element.style.display = 'none'
        wrapper.classList.remove('editor-is_box_selecting')
      }
    }
  }

  onContextmenu(e: Event) {
    e.preventDefault()
  }

  onMousedown(e: MouseEvent) {
    if (e.target === this.shell || this.shell?.contains(e.target as HTMLElement)) return
    timeoutHandler = setTimeout(() => {
      clearTimeout(timeoutHandler)
      this.showSelectBox = true
      this.selectBox.show()
      this.wrapper?.addEventListener('click', this.onClick)
    }, 200)
    this.anchor = this.getRelativePosition({ left: e.clientX, top: e.clientY })
    const conatiner = this.wrapper as HTMLElement
    document.addEventListener('mouseup', this.onMouseup)
    conatiner.addEventListener('mousemove', this.onMousemove)
    e.preventDefault()
  }

  onMousemove(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    this.head = this.getRelativePosition({ left: e.clientX, top: e.clientY })
    this.throttleSelectNode()
    this.selectBox.update()
    if (e.clientY + 50 > window.innerHeight) {
      this.container.scrollTop += 5
    } else if (e.clientY < 50) {
      this.container.scrollTop -= 5
    }
  }

  onMouseup() {
    clearTimeout(timeoutHandler)
    this.showSelectBox = false
    this.selectBox.hide()
    const conatiner = this.wrapper as HTMLElement
    document.removeEventListener('mouseup', this.onMouseup)
    conatiner.removeEventListener('mousemove', this.onMousemove)
    const { selection } = this.view.state
    if (selection instanceof NodeRangeSelection && selection.from !== selection.to) {
      this.view.focus()
    }
  }

  getRelativePosition(pos: Position) {
    return getRelativePosition(this.wrapper as HTMLElement, pos)
  }

  onClick(e: Event) {
    this.wrapper?.removeEventListener('click', this.onClick)
    e.stopPropagation()
  }

  getRangePos() {
    const { view, shell, startPos, endPos } = this
    const relative = getRelativePosition(document.body, this.wrapper as HTMLElement)
    const absoluteStartPos = { left: relative.left + startPos.left, top: startPos.top + relative.top }
    const absoluteEndPos = { left: relative.left + endPos.left, top: endPos.top + relative.top }
    const rect = shell?.getBoundingClientRect()
    if (!rect) return { from: 0, to: 0 }
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
      currentNode = startResolvedPos?.nodeAfter as Node
      currentNodePos = startResolvedPos.pos
      isInContainer =
        currentNode &&
        currentNode.isBlock &&
        getCommonParent(view.state.doc.resolve(startResolvedPos.pos + 1), endResolvedPos).node === currentNode
    } else {
      currentNode = endResolvedPos.nodeBefore as Node
      currentNodePos = endResolvedPos.pos - currentNode?.nodeSize
      isInContainer =
        currentNode &&
        currentNode.isBlock &&
        getCommonParent(startResolvedPos, view.state.doc.resolve(endResolvedPos.pos - 1)).node === currentNode
    }
    if (isInContainer) {
      return (
        getRangeInContainer(view, { node: currentNode, pos: currentNodePos }, boxRect, isLeftToRight) || {
          from: 0,
          to: 0
        }
      )
    } else {
      return getRange(view, boxRect) || { from: 0, to: 0 }
    }
  }

  selectNode() {
    const { state } = this.view
    const range = this.getRangePos()
    const { from, to } = range
    if (this.showSelectBox) {
      this.view.dispatch(state.tr.setSelection(NodeRangeSelection.create(state.tr.doc, from, to)))
    }
  }
}

const getRangeInContainer = (
  view: EditorView,
  nodePos: NodePos,
  boxRect: BoxRect,
  isLeftToRight = true
): Range | null => {
  const newNodePositions: NodePos[] = []
  let from = -1
  let to = -1
  nodePos.node.forEach((node, offset) => {
    const pos = nodePos.pos + offset + 1
    const dom = view.nodeDOM(pos) as HTMLElement
    const rect = dom.getBoundingClientRect()
    if (!rect) return false
    const isIntersact = node.isBlock
      ? hasIntersectWithContainer(view, { node, pos }, boxRect, from !== -1 && isLeftToRight)
      : boxIsIntersecting(boxRect, rect)
    if (isIntersact) {
      if (from === -1) {
        from = pos
        if (!isLeftToRight && newNodePositions.length) {
          const lastNodePos = newNodePositions[newNodePositions.length - 1]
          if (hasIntersectWithContainer(view, lastNodePos, boxRect)) from = lastNodePos.pos
        }
      }
      to = pos + node.nodeSize
    }
    if (node.isBlock) newNodePositions.push({ node, pos })
  })
  if (from !== -1) return { from, to }
  for (const sonNodePos of newNodePositions) {
    const newRange = getRangeInContainer(view, sonNodePos, boxRect, isLeftToRight)
    if (newRange) return newRange
  }
  return null
}

const hasIntersectWithContainer = (view: EditorView, nodePos: NodePos, boxRect: BoxRect, checkSon = true) => {
  const dom = view.nodeDOM(nodePos.pos) as HTMLElement
  const rect = dom?.getBoundingClientRect()
  if (rect && boxHasTwoSideIntersection(boxRect, rect)) return true
  if (!checkSon) return false

  let hasIntersect = false

  nodePos.node.descendants((node, pos) => {
    if (hasIntersect || node.isText) return false
    pos = pos + nodePos.pos + 1
    const dom = view.nodeDOM(pos) as HTMLElement
    const rect = dom.getBoundingClientRect()
    if (!rect) return false
    hasIntersect = node.isBlock ? boxHasTwoSideIntersection(boxRect, rect) : boxIsIntersecting(boxRect, rect)
  })
  return hasIntersect
}

const getRange = (view: EditorView, boxRect: BoxRect): Range | null => {
  let from = -1
  let to = -1
  let isIntersecting = false
  view.state.doc.forEach((node, pos) => {
    if (node.isBlock) {
      isIntersecting = hasIntersectWithContainer(view, { node, pos }, boxRect, false)
    } else {
      const dom = view.nodeDOM(pos) as HTMLElement
      const rect = dom.getBoundingClientRect()
      isIntersecting = rect && boxIsIntersecting(boxRect, rect)
    }
    if (isIntersecting) {
      if (from === -1) from = pos
      to = pos + node.nodeSize
    }
    return false
  })
  if (from === -1) return null
  return { from, to }
}

export const getRelativePosition = (container: HTMLElement, position: HTMLElement | Position) => {
  const containerRect = container.getBoundingClientRect()
  if (position instanceof HTMLElement) {
    const { left, top } = position.getBoundingClientRect()
    position = { left, top }
  }
  return { left: position.left - containerRect.left, top: position.top - containerRect.top }
}

const boxIsIntersecting = (box1: BoxRect, box2: BoxRect) => {
  return !(box1.bottom < box2.top || box1.top > box2.bottom || box1.right < box2.left || box1.left > box2.right)
}

const boxHasTwoSideIntersection = (box: BoxRect, node: BoxRect) => {
  const isLeftIntersect = box.left < node.left && box.right > node.left
  const isRightIntersect = box.left < node.right && box.right > node.right
  const isTopIntersect = box.top < node.top && box.bottom > node.top
  const isBottomIntersect = box.top < node.bottom && box.bottom > node.bottom
  return (
    (isLeftIntersect && isTopIntersect) ||
    (isLeftIntersect && isBottomIntersect) ||
    (isRightIntersect && isTopIntersect) ||
    (isRightIntersect && isBottomIntersect) ||
    (isLeftIntersect && isRightIntersect && !(box.top > node.bottom || box.bottom < node.top)) ||
    (isTopIntersect && isBottomIntersect && box.left < node.left && box.right > node.right) ||
    (isLeftIntersect && isRightIntersect && isTopIntersect && isBottomIntersect)
  )
}

const getCommonParent = (startPos: ResolvedPos, endPos: ResolvedPos) => {
  const $pos = startPos.pos > endPos.pos ? startPos : endPos
  const $other = startPos.pos > endPos.pos ? endPos : startPos
  for (let i = $pos.depth; i > 0; i -= 1) {
    const node = $pos.node(i)
    const pos = i > 0 ? $pos.before(i) : 0
    if ($other.parent === node || pos < $other.pos) {
      return { pos: pos, start: $pos.start(i), end: $pos.end(i), depth: i, node }
    }
  }
  return { pos: 0, start: 0, end: startPos.doc.nodeSize, depth: 0, node: startPos.doc }
}
