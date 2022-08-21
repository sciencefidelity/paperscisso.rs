<script lang="ts">
  import { history } from 'prosemirror-history'
  import { EditorState } from 'prosemirror-state'
  import { EditorView } from 'prosemirror-view'
  import 'prosemirror-view/style/prosemirror.css'
  import { plus } from '../plugins/plus'
  import { onDestroy, onMount } from 'svelte'
  import { doc } from '../doc'
  import { hotkeys } from '../plugins/hotkeys'
  import { schema } from '../schema'
  import Menu from './Menu.svelte'

  let view: EditorView
  let editor: HTMLElement
  let state: EditorState

  onMount(() => {
    state = EditorState.create({
      schema,
      doc,
      plugins: [history(), hotkeys(schema), plus]
    })
    view = new EditorView({ mount: editor }, { state })
  })

  onDestroy(() => {
    view && view.destroy()
  })
</script>

<Menu {view} />
<div bind:this={editor} />

<style global lang="postcss">
  button {
    border: none;
    background-color: transparent;
  }

  code {
    font-family: monospace;
    font-size: 1rem;
    background-color: hsl(0, 0%, 90%);
    padding: 0.1rem 0.3rem;
    border-radius: 0.2rem;
  }

  .menu {
    /* display: inline-block; */
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.5);
    padding-bottom: 0.3rem;
    text-align: center;
  }

  .plus-icon {
    font-size: 1rem;
    display: inline-block;
    margin-inline: 0.5rem;
    user-select: none;
    opacity: 0.5;
    padding: 0.25rem 0.225rem 0.15rem 0.225rem;
    line-height: 1.05;
    border-radius: 0.25rem;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      background-color: hsl(0, 0%, 90%);
      opacity: 0.7;
    }
  }
</style>
