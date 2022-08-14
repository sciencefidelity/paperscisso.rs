<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import '../app.css';
  import EditorView from '$lib/EditorView.svelte';
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

<style>
  .main {
    display: grid;
    align-items: start;
    /* justify-content: center; */
    /* height: 100vh; */
  }

  .editor {
    margin: 0 auto;
    width: 85%;
    height: 30rem;
  }
</style>
