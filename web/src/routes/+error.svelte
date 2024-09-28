<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	if (($page.status == 404 || $page.status == 500) && browser) {
		goto('/');
	}
</script>

<svelte:head>
	<title>404</title>
</svelte:head>

<div class="not-found">
	<h1>not found</h1>
	<p>this path does not exist</p>
	<a href="/">home</a>
</div>

<style>
	h1 {
		font-size: 4rem;
	}

	.not-found {
		padding-top: 3rem;
		font-family: 'Menoe Grotesque Pro', monospace;
		font-size: 200%;
		line-height: 1.5;
		text-align: center;
	}
</style>
