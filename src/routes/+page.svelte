<!-- AIdea Landing Page -->
<script lang="ts">
	import { Button } from 'flowbite-svelte';
</script>

<div class="w-screen h-screen flex flex-col items-center justify-center">
	<h1 class="text-3xl">need a programming <span class="text-primary-500">idea?</span></h1>
	<h2 class="">
		<span class="text-primary-500">aidea</span> is an AI-powered tool to generate programming ideas
	</h2>
	<Button class="mt-4" href="/generator">Open the generator</Button>

	<div class="absolute bottom-8 flex flex-row gap-2">
		<button class="text-primary-500 hover:text-primary-400 transition-colors">about</button>
		|
		<button class="text-primary-500 hover:text-primary-400 transition-colors">github</button>
	</div>
</div>
