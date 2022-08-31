import {
  chainCommands,
  createParagraphNear,
  liftEmptyBlock,
  newlineInCode,
  setBlockType,
  splitBlock,
  toggleMark,
  wrapIn
} from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import type { Schema } from 'prosemirror-model'
import type { Command } from 'prosemirror-state'

const heading = (schema: Schema, level: number) => {
  return setBlockType(schema.nodes.heading, { level })
}

export const enter = chainCommands(
  newlineInCode,
  createParagraphNear,
  liftEmptyBlock,
  splitBlock
)

export type Bindings = { [key: string]: Command }
export default (schema: Schema): Bindings => ({
  undo,
  redo,
  toggleStrong: toggleMark(schema.marks.strong),
  toggleEm: toggleMark(schema.marks.em),
  toggleStrike: toggleMark(schema.marks.strike),
  toggleCode: toggleMark(schema.marks.code),
  toggleBlockquote: wrapIn(schema.nodes.blockquote),
  toggleHeading1: heading(schema, 1),
  toggleHeading2: heading(schema, 2),
  toggleHeading3: heading(schema, 3)
})
