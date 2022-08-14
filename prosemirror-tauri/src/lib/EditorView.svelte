<script lang="ts">
  import { onMount, onDestroy /* createEventDispatcher */ } from 'svelte';
  import { schema } from 'prosemirror-schema-basic';
  import { EditorState } from 'prosemirror-state';
  import { EditorView } from 'prosemirror-view';
  import { undo, redo, history } from 'prosemirror-history';
  import { keymap } from 'prosemirror-keymap';
  import { baseKeymap } from 'prosemirror-commands';
  import { DOMParser } from 'prosemirror-model';

  // const dispatch = createEventDispatcher();

  // export let placeholder = '';
  let view: EditorView;
  let state: EditorState;
  let editor: HTMLElement;
  // (The null arguments are where you can specify attributes, if necessary.)
  let doc = schema.node('doc', null, [
    schema.node('paragraph', null, [schema.text('One.')]),
    schema.node('horizontal_rule'),
    schema.node('paragraph', null, [schema.text('Two!')])
  ]);

  // export function focus() {
  // 	view && view.focus();
  // }

  // export function blur() {
  // 	editor && editor.blur();
  // }

  onMount(() => {
    let content = document.getElementById('content');
    state = EditorState.create({
      schema,
      // doc: DOMParser.fromSchema(schema).parse(content!),
      doc,
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
<div id="content">
  <p>First paragraph</p>
  <p>Second</p>
  <p>Third</p>
  <p>Forth</p>
  <p>Fifth</p>
</div>

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
