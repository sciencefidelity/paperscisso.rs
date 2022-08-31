import { Selection, TextSelection } from 'prosemirror-state'
import type { Node, ResolvedPos } from 'prosemirror-model'

interface BoxRect {
  left: number
  top: number
  right: number
  bottom: number
}

interface NodeInfo {
  pos: number
  start: number
  end: number
  depth: number
  node: Node
}

interface Position {
  left: number
  top: number
}

export const getRelativePosition = (container: HTMLElement, position: HTMLElement | Position) => {
  const containerRect = container.getBoundingClientRect()
  if (position instanceof HTMLElement) {
    const { left, top } = position.getBoundingClientRect()
    position = { left, top }
  }
  return { left: position.left - containerRect.left, top: position.top - containerRect.top }
}

export const isBoxHasTwoSideIntersaction = (box: BoxRect, node: BoxRect) => {
  const isLeftIntersact = box.left < node.left && box.right > node.left
  const isRightIntersact = box.left < node.right && box.right > node.right
  const isTopIntersact = box.top < node.top && box.bottom > node.top
  const isBottomIntersact = box.top < node.bottom && box.bottom > node.bottom
  return (
    (isLeftIntersact && isTopIntersact) ||
    (isLeftIntersact && isBottomIntersact) ||
    (isRightIntersact && isTopIntersact) ||
    (isRightIntersact && isBottomIntersact) ||
    (isLeftIntersact && isRightIntersact && !(box.top > node.bottom || box.bottom < node.top)) ||
    (isTopIntersact && isBottomIntersact && box.left < node.left && box.right > node.right) ||
    (isLeftIntersact && isRightIntersact && isTopIntersact && isBottomIntersact)
  )
}

export const isBoxIntersection = (box1: BoxRect, box2: BoxRect) => {
  return !(box1.bottom < box2.top || box1.top > box2.bottom || box1.right < box2.left || box1.left > box2.right)
}

export const getCommonParent = (startPos: ResolvedPos, endPos: ResolvedPos) => {
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

export const isContainerNode = (node: Node) => {
  return node.isBlock && !node.isTextblock && !node.isAtom
}

export const isTextSelection = (selection: Selection) => {
  return selection instanceof TextSelection
}
