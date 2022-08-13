<script lang="ts">
  import { onMount, onDestroy /* createEventDispatcher */ } from 'svelte';
  import { schema } from 'prosemirror-schema-basic';
  import { EditorState } from 'prosemirror-state';
  import { EditorView } from 'prosemirror-view';
  import { undo, redo, history } from 'prosemirror-history';
  import { keymap } from 'prosemirror-keymap';
  import { baseKeymap } from 'prosemirror-commands';

  // const dispatch = createEventDispatcher();

  // export let placeholder = '';
  let view: EditorView;
  let state: EditorState;
  let editor: HTMLElement;

  // export function focus() {
  // 	view && view.focus();
  // }

  // export function blur() {
  // 	editor && editor.blur();
  // }

  onMount(() => {
    state = EditorState.create({
      schema,
      plugins: [
        history(),
        keymap({ 'Mod-z': undo, 'Mod-y': redo }),
        keymap(baseKeymap)
      ]
    });
    view = new EditorView(
      { mount: editor },
      {
        state,
        dispatchTransaction(transaction) {
          console.log(
            'Document size went from',
            transaction.before.content.size,
            'to',
            transaction.doc.content.size
          );
          let newState = view.state.apply(transaction);
          view.updateState(newState);
        }
      }
    );
  });

  onDestroy(() => {
    view && view.destroy();
  });
</script>

<div class="prosemirror" bind:this={editor} on:focus on:blur on:keydown />

<style lang="postcss" global>
  .prosemirror {
    border: 1px solid #ccc;
    height: 100%;
    padding: 0.5rem 1rem;
    p {
      margin-block: 0.5rem;
    }
  }
</style>
