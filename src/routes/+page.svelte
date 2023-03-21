<script>
	import Search from '../lib/Search.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import Clock from '../lib/Clock.svelte';
	import { createEventDispatcher } from 'svelte';
	import Form from '../lib/Modal.svelte';

	import { titleLink, link, imageLink } from '../lib/store/stores';
	import Link from '../lib/Link.svelte';

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

<main>
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
	<div class="drawer drawer-end">
		<input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content drawer-content-custom ">
			<!-- Page content here -->
			<!-- Arriba -->
			<div
				class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 m-10 justify-center"
			>
				<!-- Hora y Tiempo -->
				<div class="flex flex-col ">
					<div class="flex justify-center items-center mt-28 h-48">
						<Clock />
					</div>
				</div>
				<!-- Logo -->
				<div class="flex flex-col ">
					<div class="flex justify-center items-center  img-mex w-96 m-auto">
						<img src={logo_pic} alt="Logo Mexic0de" class="rounded-full " />
					</div>
				</div>
				<!-- Seleccionador de Tema -->
				<div class="flex flex-col ">
					<div class="flex justify-center items-center mt-28 h-48 butDiv">
						<label for="my-drawer-4" class="drawer-button button show-drawer" data-text="Awesome">
							<span class="actual-text text-primary">&nbsp;Cambiar Tema &nbsp; </span>
							<span class="hover-text" aria-hidden="true">&nbsp;Cambiar Tema &nbsp;</span>
						</label>
					</div>
				</div>
			</div>
			<!-- En Medio -->
			<div class="flex justify-center mt-6 min-w-screen">
				<Search />
			</div>
			<!-- Abajo -->
			<div
				class="grid grid-flow-row md:grid-flow-col gap-5 auto-cols-max mt-10 mb-10 justify-center "
			>
				{#each $titleLink as title, i}
					<Link
						titleLink={title}
						link={$link[i]}
						image={$imageLink[i]}
						on:myevent={() => handleClick(i)}
					/>
				{/each}

				<!-- <a
            href={$link}
            class="relative block overflow-hidden rounded-xl  bg-cover bg-center bg-no-repeat"
            style="background-image: url({$image})"
          >
            <div class="absolute inset-0 bg-black/75" />
  
            <div
              class="relative flex items-start justify-between p-4 sm:p-6 lg:p-8"
            >
              <div class="sm:pt-18 pt-12 text-white lg:pt-24">
                <h3 class="text-xl font-bold sm:text-2xl">{$titleLink}</h3>
  
                <p class="text-sm">Plataforma de {$titleLink}</p>
              </div>
              <button class="z-50" on:click|preventDefault={handleClick}>
                <span
                  class="inline-flex items-center gap-0.5 rounded-full bg-black px-2 py-1 text-xs font-semibold text-white "
                >
                  EDITAR
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 text-secondary"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    ><path
                      d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z"
                    /></svg
                  >
                </span>
              </button>
            </div>
          </a> -->
			</div>
		</div>
		<div class="drawer-side">
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
		</div>
	</div>
</main>

<style>
	/* Mobile */
	@media (max-width: 768px) {
		img {
			width: 100px;
			height: 100px;
		}
		.img-mex {
			margin-top: 15px;
		}
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
