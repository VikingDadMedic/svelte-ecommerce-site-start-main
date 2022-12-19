<script lang="ts">
	import SearchIcon from '$lib/components/Icons/Search.svelte';
	import Product from '$lib/components/Product.svelte';
	import { flip } from 'svelte/animate';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: products = form?.products ?? data.products;
	$: categories = form?.categories ?? data.categories;

	let results = 0;
	const title = results > 0 ? `Search results (${results})` : 'Our lego products';
	const sizes = '(max-width: 768px) 512px, (max-width: 1024px) 464px,  218px';
</script>

<svelte:head>
	<title>Products</title>
	<meta name="description" content="All our lovely lego products." />
</svelte:head>

<h1>Product categories</h1>
<nav aria-label="category navigation" class="categories">
	{#each categories as { name: categoryName, slug }}
		<div class="category">
			<a href={`/categories/${slug}`}>{categoryName}</a>
		</div>
	{/each}
</nav>

<h2>{title}</h2>

<form method="POST">
	<label class="screen-reader-text" for="search">Search</label>
	<input
		id="search"
		type="text"
		name="query"
		placeholder="Search"
	/>
	<button type="submit"><span class="screen-reader-text">Search</span><SearchIcon /></button>
</form>

<div class="products">
	{#each products as { description, id, imageId, name, placeholder, price, slug, alt }, index (id)}
		<article
			aria-posinset={index + 1}
			aria-setsize={products.length}
			class="product"
			animate:flip={{ duration: 500 }}
		>
			<Product
				{alt}
				{description}
				{id}
				{imageId}
				{name}
				lazyLoad={false}
				{placeholder}
				{price}
				{sizes}
				{slug}
			/>
		</article>
	{/each}
</div>
<style>
	h1 {
		margin-top: var(--spacing-12);
	}

	form {
		display: flex;
		width: fit-content;
		margin: var(--spacing-0) auto;
	}
	form button {
		border: var(--spacing-px-2) solid var(--colour-dark);
		border-radius: var(--spacing-1);
		background-color: var(--colour-light-shade-10);
		vertical-align: middle;
		margin-left: var(--spacing-1);
	}

	input {
		background: var(--colour-light-tint-50);
		border: var(--spacing-px) solid var(--colour-dark);
		border-radius: var(--spacing-1);
		width: calc(24rem - var(--spacing-12));
		font-size: var(--font-size-3);
		text-indent: var(--spacing-2);
	}
</style>
