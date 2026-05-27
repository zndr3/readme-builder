<script lang="ts">
	import './layout.css';
	// import favicon from '$lib/assets/favicon.svg';
	import zapw from '$lib/assets/zapw.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={zapw} /></svelte:head>
{@render children()}
