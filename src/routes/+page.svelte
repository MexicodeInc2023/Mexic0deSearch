<script>
	import Search from '../lib/Search.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import Clock from '../lib/Clock.svelte';
	import { createEventDispatcher } from 'svelte';
	import Form from '../lib/Modal.svelte';

	import { titleLink, link, imageLink } from '../lib/store/stores';
	import Link from '../lib/Link.svelte';
	import Logo from '../lib/Logo.svelte';

	const logo_pic = '../logo-pic.png';

	let showModal = false;
	let showAlertSuccess = false;
	let showAlertError = false;
	let currentId;

	let newLink = '';
	let newImage = '';
	let newTitle = '';

	const dispatch = createEventDispatcher();
	function handleClick(i) {
		showModal = true;
		currentId = i;
		console.log('click' + i, showModal);
	}

	function changeData() {
		let id = currentId;
		// Actualizamos los datos a la store
		try {
			link.update((n) => {
				n[id] = newLink;
				return n;
			});
			imageLink.update((n) => {
				n[id] = newImage;
				return n;
			});
			titleLink.update((n) => {
				n[id] = newTitle;
				return n;
			});
			showModal = false;
			// Enviamos un toast informando el cambio
			showAlertSuccess = true;
		} catch (e) {
			showAlertError = true;
			console.log(e);
		}
	}
	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<body>
	<Form bind:showModal>
		<div slot="header">
			<h2 class=" text-2xl ">Editar Tarjeta</h2>
		</div>
		<div slot="body">
			{#if showAlertSuccess}
				<div class="alert alert-success shadow-lg mt-2">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
						<span>Se actualizo correctamente! puedes darle click a la X para salir</span>
					</div>
				</div>
			{:else if showAlertError}
				<div class="alert alert-error shadow-lg">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
						<span>Error! por favor intentalo de nuevo.</span>
					</div>
				</div>
			{:else}
				<div />
			{/if}
			<div class=" flex flex-col relative items-center text-center m-5">
				<div class="form-control mt-5">
					<label class="bloc text-sm font-bold mb-2" for="Nombre del Sitio">
						Nombre del Sitio
					</label>
					<input
						type="text"
						placeholder="Google"
						class="input input-bordered input-info w-full max-w-xs"
						bind:value={newTitle}
					/>
				</div>
				<div class="form-control mt-5">
					<label class="bloc text-sm font-bold mb-2" for="Dirección del Sitio">
						Dirección del Sitio
					</label>
					<input
						type="text"
						placeholder="https://www.google.com"
						class="input input-bordered input-success w-full max-w-xs"
						bind:value={newLink}
					/>
				</div>
				<div class="form-control mt-5">
					<label class="bloc text-sm font-bold mb-2" for="Imagen del Sitio">
						Imagen del Sitio
					</label>
					<input
						type="text"
						placeholder="Url de la imagen"
						class="input input-bordered input-warning w-full max-w-xs"
						bind:value={newImage}
					/>
					<button class="btn btn-outline mt-5" on:click={changeData}>Guardar</button>
				</div>
			</div>
		</div>
	</Form>
	<main class="drawer drawer-end">
		<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
		<section class="drawer-content drawer-content-custom ">
			<article
				class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 m-10 justify-center place-items-center"
			>
				<!-- Hora y Tiempo -->
				<div class="hidden sm:flex lg:flex">
					<Clock />
				</div>
				<Logo {logo_pic} />

				<!-- Seleccionador de Tema -->
				<div class="flex flex-col">
					<div class="flex justify-center items-center mt-28 h-48 butDiv">
						<label for="my-drawer-4" class="drawer-button button show-drawer" data-text="Awesome">
							<span class="actual-text text-primary">&nbsp;Cambiar Tema &nbsp; </span>
							<span class="hover-text" aria-hidden="true">&nbsp;Cambiar Tema &nbsp;</span>
						</label>
					</div>
				</div>
			</article>
			<!-- En Medio -->
			<article>
				<Search />
			</article>

			<!-- Abajo -->
			<article
				class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-5 auto-cols-max mt-10 mx-40 justify-center"
			>
				{#each $titleLink as title, i}
					<Link
						titleLink={title}
						link={$link[i]}
						image={$imageLink[i]}
						on:myevent={() => handleClick(i)}
					/>
				{/each}
			</article>
		</section>
		<aside class="drawer-side">
			<label for="my-drawer-4" class="drawer-overlay" />
			<ul class="menu p-4 w-80 bg-base-100 text-base-content">
				<p>Selecciona un Tema</p>
				<li>
					<button data-set-theme="dark">Dark</button>
				</li>
				<li>
					<button data-set-theme="light">Light</button>
				</li>
				<li>
					<button data-set-theme="cupcake">Cupcake</button>
				</li>
				<li>
					<button data-set-theme="bumblebee">Bumblebee</button>
				</li>
				<li>
					<button data-set-theme="emerald">Emerald</button>
				</li>
				<li>
					<button data-set-theme="synthwave">Synthwave</button>
				</li>
				<li>
					<button data-set-theme="retro">Retro</button>
				</li>
				<li>
					<button data-set-theme="cyberpunk">Cyberpunk</button>
				</li>
				<li>
					<button data-set-theme="valentine">Valentine</button>
				</li>
				<li>
					<button data-set-theme="halloween">Halloween</button>
				</li>
				<li>
					<button data-set-theme="garden">Garden</button>
				</li>
				<li>
					<button data-set-theme="forest">Forest</button>
				</li>
				<li>
					<button data-set-theme="aqua">Aqua</button>
				</li>
				<li>
					<button data-set-theme="lofi">Lo-Fi</button>
				</li>
				<li>
					<button data-set-theme="pastel">Pastel</button>
				</li>
				<li>
					<button data-set-theme="wireframe">Wireframe</button>
				</li>
				<li>
					<button data-set-theme="black">Black</button>
				</li>
				<li>
					<button data-set-theme="luxury">Luxury</button>
				</li>
				<li>
					<button data-set-theme="dracula">Dracula</button>
				</li>
				<li>
					<button data-set-theme="lemonade">Lemonade</button>
				</li>
				<li>
					<button data-set-theme="autumn">Autumn</button>
				</li>
				<li>
					<button data-set-theme="acid">Acid</button>
				</li>
			</ul>
		</aside>
	</main>
</body>

<style>
	/* Mobile */
	@media (max-width: 768px) {
		.butDiv {
			margin-top: 15px;
		}
	}

	/* Boton */
	/* === removing default button style ===*/
	.button {
		margin: 0;
		height: auto;
		background: transparent;
		padding: 0;
		border: none;
	}

	/* button styling */
	.button {
		cursor: pointer;
		--border-right: 6px;
		--text-stroke-color: rgba(255, 255, 255, 0);
		--animation-color: #3766ff;
		--fs-size: 2em;
		letter-spacing: 3px;
		text-decoration: none;
		font-size: var(--fs-size);
		font-family: 'Arial';
		position: relative;
		text-transform: uppercase;
		color: transparent;
		-webkit-text-stroke: 1px var(--text-stroke-color);
	}
	/* this is the text, when you hover on button */
	.hover-text {
		position: absolute;
		box-sizing: border-box;
		content: attr(data-text);
		color: var(--animation-color);
		width: 0%;
		inset: 0;
		border-right: var(--border-right) solid var(--animation-color);
		overflow: hidden;
		transition: 0.5s;
		-webkit-text-stroke: 1px var(--animation-color);
	}
	/* hover */
	.button:hover .hover-text {
		width: 100%;
		filter: drop-shadow(0 0 23px var(--animation-color));
	}
</style>
