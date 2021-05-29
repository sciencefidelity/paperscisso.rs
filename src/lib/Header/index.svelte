<script lang="ts">
  import logo from './svelte-logo.svg';
</script>

<header>
  <div class="container">
    <div class="scissors noselect">&#9985;</div>
    <div class="logo-name noselect">Paper<br />Scissors</div>
    <div class="intro">
      <p><span class="drop-cap">L</span>orem ipsum dolor sit amet, consectetur adipisici elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  </div>
</header>

<style lang="scss">
  .container {
    margin: auto;
    text-align: center;
    position: relative;
    width: 100vw;
    // height: 100vh;
  }

  .scissors {
    position: absolute;
    left: 50%;
    top: 30rem;
    transform: rotate(12deg) translate(-50%, -50%);
    font-family: STIXGeneral;
    font-size: 50rem;
    opacity: 0.2;
    line-height: 0;
  }

  .logo-name {
    font-family: "Infini";
    font-weight: 900;
    font-size: 8rem;
    line-height: 1.4;
    text-align: center;
    letter-spacing: 1.9rem;
    margin: auto;
    max-width: 95rem;
    width: 88%;
    border-bottom: 15px dashed rgba(246,236,227,0.2);
    text-transform: uppercase;
    padding: 12rem 0 2rem 0;
    display: inline-block;
  }

  .intro {
    margin: 7rem auto;
    max-width: 95rem;
    width: 88%;
    font-size: 1.6rem;
    line-height: 1.5;
    font-family: "Menoe Grotesque Pro";
    font-weight: 400;
    letter-spacing: 0.04rem;
    text-align: justify;
  }

  #site-main::after {
    background: url(./images/noise.jpg);
    content: "";
    height: 100%;
    left: 0px;
    opacity: 0.02;
    pointer-events: none;
    position: absolute;
    top: 0px;
    width: 100%;
    z-index: 201;
  }

  .noselect {
    -webkit-user-select: none;
    user-select: none;
  }

</style>
