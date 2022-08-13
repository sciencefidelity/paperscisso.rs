<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
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
    place-items: center;
    height: 100vh;
  }

  .editor {
    width: 85%;
    height: 30rem;
    border: 1px solid #ccc;
    padding: 1rem;
  }
</style>
