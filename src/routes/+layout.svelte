<svelte:head>
	<title>aidea</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
</svelte:head>

<slot />

<style lang="scss">
	// use the font globally
	:global(body) {
		font-family: 'Roboto', sans-serif;
	}
</style>
