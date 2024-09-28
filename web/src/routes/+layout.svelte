<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import GlobalStyles from '$lib/GlobalStyles.svelte';
	import Header from '$lib/Header.svelte';
</script>

<svelte:head>
	<title>PaperScissors</title>
	<meta name="Description" content="Paper Scissors Stone." />
</svelte:head>

<link rel="icon" type="image/x-icon" href="/favicon.svg" />
<link rel="mask-icon" href="/mask-icon.svg" color="#ff7a6b" />
<meta name="theme-color" content="#ffffff" />

<GlobalStyles>
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</GlobalStyles>

<style>
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
</style>
