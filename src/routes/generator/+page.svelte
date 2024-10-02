<!-- AIdea Generator Page -->
<script lang="ts">
	import { Button, Card, Skeleton } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	let ideas: string[] = $state([]);
	let currentIdea: string = $state('');
	let currentIdeaSaved: boolean = $state(false);
	let remaining: number = $state(0);

	async function genIdea() {
		try {
			const res = await fetch('/api/generateIdea');
			const data = await res.json();
			currentIdea = data.idea;
			remaining = data.remaining;
			currentIdeaSaved = false;
		} catch (error) {
			console.log('Error fetching idea: ', error);
		}
	}

	function saveIdea() {
		ideas = [...ideas, currentIdea];
		currentIdeaSaved = true;
	}

	onMount(() => {
		genIdea();
	});
</script>

<div class="w-screen p-2">
	<div class="text-2xl">
		<span class="text-primary-500 font-extralight">ai</span>dea generator
	</div>

	<Card class="min-w-full mt-4">
		{#if !currentIdea}
			<Skeleton size="sm" />
		{/if}
		<h5>{currentIdea}</h5>

		<div class="mt-2 flex gap-2 items-center">
			<Button size="xs" on:click={saveIdea} disabled={currentIdeaSaved}
				>{currentIdeaSaved ? 'Saved!' : 'Save'}</Button
			>
			<Button
				size="xs"
				outline={!currentIdeaSaved}
				color={currentIdeaSaved ? 'primary' : 'red'}
				on:click={genIdea}>Regenerate</Button
			>

			<p class={`ml-auto font-mono text-sm ${remaining ? '' : 'text-red-500'}`}>
				{remaining ? remaining : 0} remaining
			</p>
		</div>
	</Card>

	{#if ideas.length > 0}
		<p class="text-lg">saved ideas</p>

		<div class="mt-4">
			{#each ideas as idea, i}
				<Card class="min-w-full mb-2">
					<h5>{idea}</h5>

					<div class="mt-2 flex gap-2 items-center">
						<Button size="xs" outline color="red" on:click={() => (ideas = ideas.slice(0, i))}
							>Remove</Button
						>
					</div>
				</Card>
			{/each}
		</div>
	{/if}
</div>
