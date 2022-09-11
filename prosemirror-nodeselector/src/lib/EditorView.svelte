<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { dropCursor } from 'prosemirror-dropcursor'
  import { gapCursor } from 'prosemirror-gapcursor'
  import { history } from 'prosemirror-history'
  import { EditorState } from 'prosemirror-state'
  import { EditorView } from 'prosemirror-view'
  import 'prosemirror-view/style/prosemirror.css'
  import { selectionBox } from '../plugins/selectionBox'
  import { selectedNode } from '../plugins/selectedNode'
  import { hotkeys } from '../plugins/hotkeys'
  import { doc } from '../doc'
  import { schema } from '../schema'

  let view: EditorView
  let editor: HTMLElement
  let state: EditorState

  onMount(() => {
    state = EditorState.create({
      schema,
      doc,
      plugins: [history(), hotkeys(schema), dropCursor(), gapCursor(), selectionBox(), selectedNode()]
    })
    view = new EditorView(
      { mount: editor },
      {
        handleDOMEvents: {
          blur: () => {
            editor.classList.remove('editor-focused')
            return false
          },
          focus: () => {
            editor.classList.add('editor-focused')
            return false
          }
        },
        state
      }
    )
  })

  onDestroy(() => {
    view && view.destroy()
  })
</script>

<div id="container">
  <div id="wrapper">
    <div id="shell">
      <div bind:this={editor} id="editor" />
    </div>
    <div id="selectbox" />
  </div>
</div>

<style lang="postcss">
  #container {
    font-family: Avenir, sans-serif;
    height: 100%;
    width: 100%;
    overflow: hidden;
    overflow: auto;
    background-color: hsl(223, 28%, 95%);
  }

  #wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  #selectbox {
    background-color: hsla(197, 71%, 52%, 0.3);
    position: absolute;
    z-index: 1000;
  }

  #shell {
    margin: 20px 80px 80px 80px;
    min-width: 700px;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    background-color: hsl(0, 0%, 100%);
  }

  #editor {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px 20px;
    &:focus {
      outline: none;
    }
    :global {
      .start-editor-focused {
        .start-editor-node {
          &::selection {
            background: hsla(197, 71%, 52%, 0.2);
          }
        }
      }
      .ProseMirror-selectednode {
        position: relative;
        outline: none;
        background-color: rgba(45, 170, 219, 0.3);
      }
    }
  }
</style>
