<script>
	import Scissors from './Scissors.svelte';
</script>

<header>
	<div class="container">
		<div class="scissors">
			<Scissors />
		</div>
		<div class="logo noselect">Paper<br />Scissors</div>
	</div>
</header>

<style>
	.container {
		position: relative;
		width: 100vw;
		margin: auto;
		text-align: center;
	}

	.scissors {
		position: absolute;
		top: 27.2rem;
		left: 47%;
		width: 46rem;
		transform: rotate(12deg) translate(-50%, -50%);
		opacity: 0.2;
	}

	.logo {
		display: inline-block;
		width: 88%;
		max-width: 95rem;
		padding: 12rem 0 2rem;
		margin: auto;
		font-family: Infini, serif;
		font-size: 8rem;
		font-weight: 900;
		line-height: 1.4;
		text-align: center;
		text-transform: uppercase;
		letter-spacing: 1.9rem;
		border-bottom: 15px dashed rgba(246, 236, 227, 20%);
	}
</style>
