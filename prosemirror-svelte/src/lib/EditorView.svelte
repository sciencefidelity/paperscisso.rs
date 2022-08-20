<script lang="ts">
  import {
    baseKeymap,
    chainCommands,
    createParagraphNear,
    liftEmptyBlock,
    newlineInCode,
    splitBlock
  } from 'prosemirror-commands'
  import { history, redo, undo } from 'prosemirror-history'
  import { keymap } from 'prosemirror-keymap'
  import { Node, Schema, type NodeSpec } from 'prosemirror-model'
  import { EditorState, Plugin, PluginKey } from 'prosemirror-state'
  import { Decoration, DecorationSet, EditorView } from 'prosemirror-view'
  import 'prosemirror-view/style/prosemirror.css'
  import { onDestroy, onMount } from 'svelte'

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
        return ['div', 0]
      }
    } as NodeSpec,

    text: {
      group: 'inline'
    } as NodeSpec
  }

  const schema = new Schema({ nodes })

  let doc = schema.node('doc', null, [
    schema.node('paragraph', null, [
      schema.text('This is the first paragraph.')
    ]),
    schema.node('paragraph', null, [
      schema.text('This is the second paragraph.')
    ]),
    schema.node('paragraph', null, [
      schema.text('This is the third paragraph.')
    ])
  ])

  // const grabHandle = () => {
  //   return new Plugin({
  //     key: new PluginKey('grabHandle'),
  //     state: {
  //       init: (_, { doc }) => grabHandleDecoration(doc),
  //       apply: (tr, old) => (tr.docChanged ? grabHandleDecoration(tr.doc) : old)
  //     },
  //     props: {
  //       decorations() {
  //         return this.getState(doc)
  //       }
  //     }
  //   })
  // }

  const grabHandleIcon = () => {
    const element = document.createElement('div')
    element.className = 'grab-handle'
    element.innerHTML = '🌕'
    return element
  }

  const foldableIcon = () => {
    const element = document.createElement('div')
    element.className = 'foldable'
    element.innerHTML = '🌍'
    return element
  }

  const bulletIcon = () => {
    const element = document.createElement('div')
    element.className = 'bullet'
    element.innerHTML = '🪐'
    return element
  }

  const emojiPlugin = new Plugin({
    props: {
      decorations() {
        const decorators: Decoration[] = []
        doc.descendants((node, pos) => {
          if (!node.isBlock) return
          decorators.push(Decoration.widget(pos + 1, grabHandleIcon()))
          decorators.push(Decoration.widget(pos + 1, foldableIcon()))
          decorators.push(Decoration.widget(pos + 1, bulletIcon()))
        })
        return DecorationSet.create(doc, decorators)
      }
    }
  })

  onMount(() => {
    // const content = document.querySelector('#content') as HTMLDivElement

    state = EditorState.create({
      schema,
      // doc: DOMParser.fromSchema(schema).parse(content!),
      doc,
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
        keymap(baseKeymap),
        emojiPlugin
      ]
    })
    view = new EditorView({ mount: editor }, { state })
  })

  onDestroy(() => {
    view && view.destroy()
  })
</script>

<div bind:this={editor} />

<div id="content" class="output">
  <p>This is the first paragraph.</p>
  <p>This is the second paragraph.</p>
  <p>This is the third paragraph.</p>
</div>

<style global lang="postcss">
  .output {
    display: none;
    font-family: Georgia, 'Times New Roman', Times, serif;
    padding: 0.5rem 1.5rem;
    background-color: hsl(0, 0%, 97%);
  }

  .grab-handle,
  .foldable,
  .bullet {
    display: inline-block;
    margin-inline: 0.25rem;
  }
</style>
