<script lang="ts">
  import 'prosemirror-view/style/prosemirror.css'
  import { history, redo, undo } from 'prosemirror-history'
  import { keymap } from 'prosemirror-keymap'
  import { Schema, type NodeSpec } from 'prosemirror-model'
  import { EditorState } from 'prosemirror-state'
  import { EditorView } from 'prosemirror-view'
  import { onDestroy, onMount } from 'svelte'
  import {
    baseKeymap,
    chainCommands,
    createParagraphNear,
    liftEmptyBlock,
    newlineInCode,
    splitBlock
  } from 'prosemirror-commands'

  let view: EditorView
  let editor: HTMLElement
  let state: EditorState

  const nodes = {
    doc: {
      content: 'block+'
    } as NodeSpec,

    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0]
      }
    } as NodeSpec,

    text: {
      group: 'inline'
    } as NodeSpec
  }

  const schema = new Schema({ nodes })

  onMount(() => {
    state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap({
          Enter: chainCommands(
            newlineInCode,
            createParagraphNear,
            liftEmptyBlock,
            splitBlock
          ),
          'Mod-z': undo,
          'Mod-y': redo
        }),
        keymap(baseKeymap)
      ]
    })
    view = new EditorView({ mount: editor }, { state })
  })

  onDestroy(() => {
    view && view.destroy()
  })
</script>

<div bind:this={editor} />
