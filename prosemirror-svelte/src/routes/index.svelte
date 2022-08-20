<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import '../../node_modules/prosemirror-example-setup/style/style.css'
  import '../app.css'
  import EditorView from '$lib/EditorView.svelte'
</script>

<svelte:head>
  <title>Editor</title>
  <meta name="description" content="Svelte with ProseMirror demo" />
</svelte:head>

<main class="main">
  <section class="editor">
    <EditorView />
  </section>
</main>

<!-- <style global>
  .main {
    display: grid;
    align-items: start;
  }

  .editor {
    margin: 0 auto;
    width: 85%;
    height: 30rem;
    background: white;
    color: black;
    background-clip: padding-box;
    border-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 5px 0;
    margin-bottom: 23px;
  }
</style> -->
