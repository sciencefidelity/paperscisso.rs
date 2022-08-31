import type { Node, NodeSpec, Schema as ProseMirrorSchema } from 'prosemirror-model'
import type { Transaction, EditorState } from 'prosemirror-state'
import type { NodeCommandsMap } from '@/nodes'
import type { MarkCommandMap } from '@/marks'
import type { CSSProperties } from 'jsx-dom'

export interface Dispatch {
  (tr: Transaction): void
}

export type Schema = ProseMirrorSchema<NodeNameEnum, MarkNameEnum>

export interface Command<S extends Schema = any> {
  (state: EditorState<S>, dispatch: Dispatch): boolean
}

export interface Attrs {
  style?: StyleObject
}

export type CommandMap = NodeCommandsMap & MarkCommandMap

export type StyleObject = Partial<CSSStyleDeclaration>

export interface Range {
  from: number
  to: number
}

export interface Rect {
  left: number
  top: number
  width: number
  height: number
  right: number
  bottom: number
}

export { Node, NodeSpec }

export interface Position {
  left: number
  top: number
}

export type BoxRect = Omit<Rect, 'width' | 'height'>

export type SizeRect = Omit<Rect, 'bottom' | 'right'>

export interface NodePos {
  node: Node
  pos: number
}

export enum NodeNameEnum {
  HEADING = 'heading',
  PARAGRAPH = 'paragraph'
}

export enum MarkNameEnum {
  STYLE = 'style'
}

export enum PluginIDEnum {
  BOX_SELECT_NODE = 'BOX_SELECT_NODE',
  CURRENT_STATE = 'CURRENT_STATE',
  NODE_SELECT = 'NODE_SELECT',
  NODE_TRALLING = 'NODE_TRALLING',
  PLACEHOLDER = 'PLACEHOLDER',
  RESOURCE_PLACEHOLDER = 'RESOURCE_PLACEHOLDER',
  HOVER_NODE_ANCHOR = 'HOVER_NODE_ANCHOR',
  NODE_CURSOR_ANCHOR = 'NODE_CURSOR_ANCHOR',
  TEXT_MENU = 'TEXT_MENU',
  LINK_MENU = 'LINK_MENU'
}

export interface BaseProps {
  style?: CSSProperties
  class?: string
}

type Child = HTMLElement | SVGElement | string

export interface BaseChildrenProps extends BaseProps {
  children?: Child | Child[]
}
