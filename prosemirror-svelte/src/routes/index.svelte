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

<style global>
  p {
    margin-block: 0.75rem;
  }
</style>
