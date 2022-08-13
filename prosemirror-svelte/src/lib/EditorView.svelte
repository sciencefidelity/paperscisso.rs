<script lang="ts">
  import { onMount, onDestroy /* createEventDispatcher */ } from 'svelte';
  import { schema } from 'prosemirror-schema-basic';
  import { EditorState } from 'prosemirror-state';
  import { EditorView } from 'prosemirror-view';

  // const dispatch = createEventDispatcher();

  export let view: EditorView | null = null;
  export let state: EditorState | null = null;
  export let editor: HTMLElement;

  // export function focus() {
  // 	view && view.focus();
  // }

  // export function blur() {
  // 	editor && editor.blur();
  // }

  onMount(() => {
    state = EditorState.create({ schema });
    view = new EditorView({ mount: editor }, { state });
  });

  onDestroy(() => {
    view && view.destroy();
  });
</script>

<div style="outline: none" bind:this={editor} on:focus on:blur on:keydown />
