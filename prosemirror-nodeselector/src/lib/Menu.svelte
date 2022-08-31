<script lang="ts">
  import type { EditorView } from 'prosemirror-view'
  import commands from '../commands'

  export let view: EditorView

  function handleClick(event: MouseEvent) {
    const _view = view
    const { state, dispatch } = _view
    const { schema } = state
    const commandName = (event.target as HTMLButtonElement)?.dataset.command
    commands(schema)[commandName || '']?.(state, dispatch, _view)
  }
</script>

<div class="menu">
  <button on:click={handleClick} data-command="toggleStrong">B</button> |
  <button on:click={handleClick} data-command="toggleEm">I</button> |
  <button on:click={handleClick} data-command="toggleStrike">S</button> |
  <button on:click={handleClick} data-command="toggleCode">{'<>'}</button> |
  <button on:click={handleClick} data-command="toggleBlockquote">></button> |
  <button on:click={handleClick} data-command="toggleHeading1">H1</button> |
  <button on:click={handleClick} data-command="toggleHeading2">H2</button> |
  <button on:click={handleClick} data-command="toggleHeading3">H3</button>
</div>
