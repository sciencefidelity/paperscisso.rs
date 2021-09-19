<script lang="ts">
</script>

<header>
  <div class="header__container">
    <div class="header__scissors noselect">&#9985;</div>
    <div class="header__logo noselect">Paper<br />Scissors</div>
  </div>
</header>

<style lang="scss">
  .header {
    &__container {
      margin: auto;
      text-align: center;
      position: relative;
      width: 100vw;
    }
    &__scissors {
      position: absolute;
      left: 50%;
      top: 30rem;
      transform: rotate(12deg) translate(-50%, -50%);
      font-family: STIXGeneral;
      font-size: 50rem;
      opacity: 0.2;
      line-height: 0;
    }
    &__logo {
      font-family: "Infini";
      font-weight: 900;
      font-size: 8rem;
      line-height: 1.4;
      text-align: center;
      letter-spacing: 1.9rem;
      margin: auto;
      max-width: 95rem;
      width: 88%;
      border-bottom: 15px dashed rgba(246, 236, 227, 0.2);
      text-transform: uppercase;
      padding: 12rem 0 2rem 0;
      display: inline-block;
    }
  }
</style>
