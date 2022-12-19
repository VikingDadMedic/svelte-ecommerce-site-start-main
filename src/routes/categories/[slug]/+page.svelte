<script lang="ts">
	import Product from '$lib/components/Product.svelte';
	import { flip } from 'svelte/animate';
	import type { PageData } from './$types';

	export let data: PageData;
	let { categories, name, products } = data;
	$: ({ categories, name, products } = data);

	const sizes = '(max-width: 768px) 512px, (max-width: 1024px) 464px, 218px';
</script>

<svelte:head>
	<title>Categories</title>
	<meta name="description" content="All our lovely lego products." />
</svelte:head>

<h1>Product categories</h1>
<nav aria-label="category navigation" class="categories">
	{#each categories as { name: categoryName, slug }}
		<div aria-current={name === categoryName} class="category" data-sveltekit-prefetch>
			<a href={`/categories/${slug}`}>{categoryName}</a>
		</div>
	{/each}
</nav>

<h2>Our {name} Lego Range</h2>
<div class="products">
	{#each products as { description, name, price, slug, id, imageId, alt, placeholder }, index (id)}
		<article
			aria-posinset={index + 1}
			aria-setsize={products.length}
			class="product"
			data-sveltekit-prefetch
			animate:flip={{ duration: 500 }}
		>
			<Product
				{alt}
				{description}
				{id}
				{imageId}
				{name}
				lazyLoad={index !== 0}
				{placeholder}
				{price}
				{sizes}
				{slug}
			/>
		</article>
	{/each}
</div>
<style>
	[aria-current='true'] {
		background-color: var(--colour-theme);
	}

	h1 {
		margin-top: var(--spacing-12);
	}
</style>
