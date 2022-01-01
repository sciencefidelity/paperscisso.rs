<script context="module">
  import { browser, dev } from "$app/env"
  export const hydrate = dev
  export const router = browser
  export const prerender = true
</script>

<script lang="ts">
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<main>
  <div class="intro">
    <p>
      <span class="drop-cap">L</span>orem ipsum dolor sit amet, consectetur
      adipisici elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
      qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</main>

<style lang="scss">
  .intro {
    width: 88%;
    max-width: 95rem;
    margin: 7rem auto;
    font-family: 'Menoe Grotesque Pro', sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 1.5;
    text-align: justify;
    letter-spacing: 0.04rem;
  }
</style>
