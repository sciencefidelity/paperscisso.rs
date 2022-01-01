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
      position: relative;
      width: 100vw;
      margin: auto;
      text-align: center;
    }
    &__scissors {
      position: absolute;
      top: 30rem;
      left: 50%;
      font-family: STIXGeneral;
      font-size: 50rem;
      line-height: 0;
      opacity: 0.2;
      transform: rotate(12deg) translate(-50%, -50%);
    }
    &__logo {
      display: inline-block;
      width: 88%;
      max-width: 95rem;
      padding: 12rem 0 2rem;
      margin: auto;
      font-family: 'Infini';
      font-size: 8rem;
      font-weight: 900;
      line-height: 1.4;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 1.9rem;
      border-bottom: 15px dashed rgba(246, 236, 227, 20%);
    }
  }
</style>
