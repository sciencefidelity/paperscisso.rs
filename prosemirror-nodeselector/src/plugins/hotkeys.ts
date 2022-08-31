import { baseKeymap } from 'prosemirror-commands'
import { keymap } from 'prosemirror-keymap'
import type { Schema } from 'prosemirror-model'
import commands, { enter } from '../commands'

export const hotkeys = (schema: Schema) => {
  const cmd = commands(schema)
  return keymap({
    ...baseKeymap,
    Enter: enter,
    'Mod-z': cmd.undo,
    'Mod-Z': cmd.undo,
    'Mod-y': cmd.redo,
    'Mod-Y': cmd.redo,
    'Mod-Shift-z': cmd.redo,
    'Mod-b': cmd.toggleStrong,
    'Mod-B': cmd.toggleStrong,
    'Mod-i': cmd.toggleEm,
    'Mod-I': cmd.toggleEm,
    'Mod-Shift-x': cmd.toggleStrike,
    'Mod-Shift-X': cmd.toggleStrike,
    'Mod-Shift-9': cmd.toggleBlockquote,
    'Ctrl-`': cmd.toggleCode
  })
}
