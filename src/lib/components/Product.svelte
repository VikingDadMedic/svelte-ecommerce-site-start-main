<script lang="ts">
	import { PUBLIC_DIRECTUS_PROJECT_URL } from '$env/static/public';
	import Image from '$lib/components/Image.svelte';
	import Basket from '$lib/components/Icons/Basket.svelte';

	export let alt: string;
	export let description: string;
	export let lazyLoad: boolean = true;
	export let id: string;
	export let imageId: string;
	export let name: string;
	export let placeholder: string;
	export let price: number;
	export let sizes: string;
	export let slug: string;

	const IMAGE_WIDTH = 512;
	const src = `/assets/${imageId}/${slug}?width=${IMAGE_WIDTH}`;
</script>

<a href={`/products/${slug}`}>
	<Image
		{alt}
		height={IMAGE_WIDTH}
		width={IMAGE_WIDTH}
		maxWidth="100%"
		loading={lazyLoad ? 'lazy' : 'eager'}
		fetchpriority={lazyLoad ? 'high' : 'auto'}
		{slug}
		{placeholder}
		id={imageId}
		aspectRatio="1"
		{sizes}
	/>
	<div class="product-about">
		<h3><a href={`/products/${slug}`}>{name}</a></h3>
		<p>{description}</p>
	</div>
</a>
<div class="product-price-add">
	<span class="product-price"> {(price / 100).toFixed(2)}</span>
		<button class="snipcart-add-item">ADD<span class="icon"><Basket /></span></button>
</div>
