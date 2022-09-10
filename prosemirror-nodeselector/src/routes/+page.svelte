<script lang="ts">
  import '../app.css'
  import EditorView from '$lib/EditorView.svelte'
</script>

<svelte:head>
  <title>Editor</title>
  <meta name="description" content="Svelte with ProseMirror demo" />
</svelte:head>

<main class="main">
  <EditorView />
</main>

<style lang="postcss">
  .main {
    height: 100vh;
    width: 100vw;
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }
</style>
