<script lang="ts">
	import { Button } from 'flowbite-svelte';

	let currentIdea = $state('...');

	async function genIdea() {
		try {
			const res = await fetch('/api/generateIdea');
			const data = await res.json();
			currentIdea = data.idea;
		} catch (error) {
			console.log('Error fetching idea: ', error);
			currentIdea = 'Failed to generate idea';
		}
	}
</script>

<div class="w-screen h-screen flex flex-col items-center justify-center">
	<h1 class="text-3xl">need a programming <span class="text-primary-500">idea?</span></h1>

	<Button onclick={genIdea} class="mt-4">Yes please!</Button>

	<p>{currentIdea}</p>

	<div class="absolute bottom-8 flex flex-row gap-2">
		<button class="text-primary-500 hover:text-primary-400 transition-colors">about</button>
		|
		<button class="text-primary-500 hover:text-primary-400 transition-colors">github</button>
	</div>
</div>
