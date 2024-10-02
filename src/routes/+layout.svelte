<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>aidea</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
</svelte:head>

<slot />

<style lang="postcss">
	:global(html) {
		@apply bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100;
		@apply font-roboto;
	}
</style>
