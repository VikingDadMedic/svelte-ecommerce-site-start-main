<script lang="ts">
	import { PUBLIC_DIRECTUS_PROJECT_URL } from '$env/static/public';
	import Basket from '$lib/components/Icons/Basket.svelte';
	import Image from '$lib/components/Image.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { categories, description, gtin, id, image, name, price, slug, sku } = data;
	const { alt, id: imageId, placeholder } = image;
	const src = `${PUBLIC_DIRECTUS_PROJECT_URL}/assets/${imageId}/${slug}?width=512`;

	const IMAGE_WIDTH = 512;
	const sizes = '(max-width: 768px) 512px, (max-width: 1024px) 464px,  218px';
</script>

<svelte:head>
	<title>{name}</title>
	<meta name="description" content={description} />
</svelte:head>

<h1>{name}</h1>
<article class="product">
	<div class="image">
		<Image
			{alt}
			height={IMAGE_WIDTH}
			width={IMAGE_WIDTH}
			maxWidth="100%"
			loading="eager"
			fetchpriority="high"
			slug="home"
			{sizes}
			{placeholder}
			id={imageId}
			aspectRatio="1"
		/>
	</div>
	<div class="details">
		<div class="product-about">
			<h2>{name}</h2>
			<p class="description">{description}</p>
		</div>
		<div class="categories-container">
			<h3>Categories:</h3>
			<nav aria-label="category navigation" class="category-items">
				{#each categories as { name: categoryName, slug: categorySlug }}
					<div class="category"><a href={`/categories/${categorySlug}`}>{categoryName}</a></div>
				{/each}
			</nav>
		</div>

		<div class="product-price-add">
			<span class="product-price">${' '}{(price/100).toFixed(2)}</span>
			<button
				class="snipcart-add-item"
				data-item-id={id}
				data-item-price={(price/100).toFixed(2)}
				data-item-url={`/products/${slug}`}
				data-item-description={description}
				data-item-image={src}
				data-item-name={name}>ADD TO BASKET{' '}<span class="icon"><Basket /></span></button
			>
		</div>
	</div>
</article>

<style>
	h1 {
		padding: var(--spacing-8) var(--spacing-6);
	}

	h2 {
		margin-top: var(--spacing-0);
	}

	h3 {
		margin-bottom: var(--spacing-0);
		font-weight: var(--font-weight-normal);
	}

	a {
		color: var(--colour-dark);
	}

	.product {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas:
			'image'
			'details';
		row-gap: var(--spacing-6);
		max-width: 32rem;
		margin: var(--spacing-6) auto var(--spacing-12);
		border-radius: var(--spacing-1);
		padding: var(--spacing-4);
	}

	.image {
		grid-area: image;
	}

	.details {
		grid-area: details;
		height: 100%;
	}

	@media screen and (min-width: 64rem) {
		.product {
			grid-template-columns: 1fr 1fr;
			grid-template-areas: 'image details';
			column-gap: var(--spacing-12);

			max-width: var(--max-width-full);
		}

		.details {
			display: flex;
			flex-direction: column;
		}
		.categories-container {
			margin-top: auto;
		}
	}

	.categories-container nav {
		margin: var(--spacing-2) var(--spacing-0) var(--spacing-6);
	}

	.category-items {
		display: flex;
		align-content: flex-start;
		max-width: var(--max-width-full);
		margin: var(--spacing-8) var(--spacing-0) var(--spacing-12);
	}

	.product .category {
		box-shadow: none;
		border-style: none;
		background-color: transparent;
		padding: var(--spacing-1) var(--spacing-0);
		margin: var(--spacing-0) var(--spacing-2) var(--spacing-2) var(--spacing-0);
		font-size: var(--font-size-1);
	}

	.category a {
		color: var(--colour-dark);
	}

	.product-about {
		margin-top: var(--spacing-6);
		min-height: var(--spacing-32);
	}
	.description {
		font-size: var(--font-size-2);
	}
	.product-price-add {
		display: flex;
		align-items: baseline;
	}
	.product-price {
		font-size: var(--font-size-4);
	}
	.product-price-add button {
		display: inline-flex;
		align-items: center;
		margin-left: auto;
		margin-bottom: var(--spacing-6);
		padding: var(--spacing-2) var(--spacing-4);
		background: var(--colour-light-tint-50);
		border: var(--spacing-px) solid var(--colour-dark);
		border-radius: var(--spacing-1);
		box-shadow: var(--shadow-elevation-low);
		font-weight: var(--font-weight-medium);
	}

	.icon {
		margin-left: var(--spacing-1);
	}

	.product-price-add button:active {
		box-shadow: none;
		transform: translateY(var(--spacing-px-2));
	}

	.product-price-add :is(button:focus, button:hover) {
		background: var(--colour-theme);
	}
</style>
