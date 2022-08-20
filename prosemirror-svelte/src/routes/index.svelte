<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import '../../node_modules/prosemirror-example-setup/style/style.css';
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

<style global>
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

  #editor,
  .editor {
    background: white;
    color: black;
    background-clip: padding-box;
    border-radius: 4px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    padding: 5px 0;
    margin-bottom: 23px;
  }

  .ProseMirror-menubar {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    position: relative;
    min-height: 1em;
    color: #666;
    padding: 1px 6px;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid silver;
    background: white;
    z-index: 10;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: visible;
  }

  .ProseMirror-menuitem {
    margin-right: 3px;
    display: inline-block;
  }

  .ProseMirror-menuseparator {
    border-right: 1px solid #ddd;
    margin-right: 3px;
  }

  .ProseMirror-icon {
    display: inline-block;
    line-height: 0.8;
    vertical-align: -2px;
    padding: 2px 8px;
    cursor: pointer;
  }
</style>
