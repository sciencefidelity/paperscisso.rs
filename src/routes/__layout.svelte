<script lang="ts">
  import Header from "$lib/Header/index.svelte"
  import "../styles/app.scss"
</script>

<Header />
<main>
  <slot />
</main>
<footer>
  <p>
    visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
  </p>
</footer>

<style lang="scss">
  main {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    max-width: 1024px;
    padding: 1rem;
    margin: 0 auto;
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 40px 0;
    }
  }
</style>
