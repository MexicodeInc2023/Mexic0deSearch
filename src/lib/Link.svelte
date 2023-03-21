<script>
	import { createEventDispatcher } from 'svelte';
	export let titleLink = '';
	export let link = '';
	export let image = '';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('myevent');
	}
</script>

<a
	href={link}
	class="relative block overflow-hidden rounded-xl  bg-cover bg-center bg-no-repeat"
	style="background-image: url({image})"
>
	<div class="absolute inset-0 bg-black/75" />

	<div class="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
		<div class="sm:pt-18 pt-12 text-white lg:pt-24">
			<h3 class="text-xl font-bold sm:text-2xl">{titleLink}</h3>

			<p class="text-sm">Plataforma de {titleLink}</p>
		</div>
		<button class="z-50" on:click|preventDefault={handleClick}>
			<span
				class="inline-flex items-center gap-0.5 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-secondary"
					fill="currentColor"
					viewBox="0 0 256 256"
					><path
						d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"
					/></svg
				>
			</span>
		</button>
	</div>
</a>
