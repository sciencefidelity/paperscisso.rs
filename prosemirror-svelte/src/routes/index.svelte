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
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: hsl(45, 0%, 93%);
  }
  p {
    margin-block: 0.25rem;
    padding-block: 0.125rem;
    border-radius: 0.125rem;
  }
  .editor {
    margin-top: 2rem;
    background-color: hsl(0, 0%, 100%);
    min-height: 80vh;
    margin-inline: auto;
    max-width: 500px;
    padding: 1rem;
  }
  .start-editor {
    height: 100%;
    width: 100%;
    overflow: hidden;
    overflow: auto;
    background-color: #eff1f6;
  }

  .start-editor-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .start-editor-select_box {
    background-color: rgba(45, 170, 219, 0.3);
    position: absolute;
    z-index: 1000;
  }

  .start-editor-shell {
    margin: 20px 80px 80px 80px;
    width: calc(100% - 160px);
    min-width: 550px;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    background-color: #fff;
  }

  .start-editor-canvas {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding: 10px 20px;
  }

  .start-editor-canva:focus {
    outline: none;
  }
</style>
