import type { Node as ProseMirrorNode } from 'prosemirror-model'

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

export interface Range {
  from: number
  to: number
}

export interface Position {
  left: number
  top: number
}

export interface NodePos {
  node: ProseMirrorNode
  pos: number
}

export interface Rect {
  left: number
  top: number
  width: number
  height: number
  right: number
  bottom: number
}

export type BoxRect = Omit<Rect, 'width' | 'height'>
