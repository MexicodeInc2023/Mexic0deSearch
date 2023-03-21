<script>
	import { onMount } from 'svelte';
	let time = new Date();
	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();
	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
	<div class="flex flex-col">
		<span class="countdown font-mono text-5xl">
			{hours}
		</span>
		hrs
	</div>
	<div class="flex flex-col ">
		<span class="countdown font-mono text-5xl">
			{minutes}
		</span>
		min
	</div>
	<div class="flex flex-col ">
		<span class="countdown font-mono text-5xl">
			{seconds}
		</span>
		sec
	</div>
</div>
