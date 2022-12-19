 <script lang="ts">
 	import Image from '$lib/components/Image.svelte';
 	import type { PageData } from './$types';
 	import Product from '$lib/components/Product.svelte';
 
 	export let data: PageData;
 
 	const {
 		heroLink,
 		heroMessage,
 		heroTitle,
 		pageTitle,
 		pageDescription,
 		products,
 		featuredImage: { id: featuredImageId, alt, height, placeholder, width }
 	} = data;
 
 	const HERO_WIDTH = 1024;
 	const sizes = '(max-width: 768px) 512px, (max-width: 1024px) 464px,  218px';
 </script>
 
 <svelte:head>
 	<title>{pageTitle}</title>
 	<meta name="description" content={pageDescription} />
 </svelte:head>
 
 <h1 class="screen-reader-text">{pageTitle}</h1>
 
 <a href={heroLink}>
 	<div class="hero-container">
 		<div class="hero-image">
 			<Image
 				{alt}
 				height={Math.floor((HERO_WIDTH * height) / width)}
 				width={HERO_WIDTH}
 				maxWidth="100%"
 				sizes={`(max-width: ${HERO_WIDTH}px) 100vw, ${HERO_WIDTH}px}`}
 				loading="eager"
 				fetchpriority="high"
 				slug="featured-products"
 				{placeholder}
 				id={featuredImageId}
 				aspectRatio="5/3"
 			/>
 		</div>
 		<div class="hero-overlay">
 			<div class="hero-heading">{heroTitle}</div>
 			<div class="hero-text">{heroMessage}</div>
 		</div>
 	</div>
 </a>
 <h2>Popular Items</h2>
<div class="products">
 	{#each products as { description, name, price, slug, id, imageId, alt: productAlt, placeholder }, index}
<article aria-posinset={index + 1} aria-setsize={products.length} class="product">
 			<Product
 				alt={productAlt}
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
	.hero-container {
		display: grid;
		grid-template-rows: '1fr';
		width: var(--max-width-full);
		margin-bottom: var(--spacing-12);
	}

	a {
		text-decoration: none;
	}

	.hero-image,
	.hero-overlay {
		grid-area: 1/1/1/1;
	}

	.hero-heading {
		display: inline-flex;
		margin-top: var(--spacing-6);
		margin-left: var(--spacing-6);
		font-family: var(--font-family-heading);
		font-weight: var(--font-weight-black);
		font-size: var(--font-size-4);
	}

	.hero-text {
		display: none;
		margin-top: var(--spacing-6);
		margin-left: var(--spacing-12);
		font-size: var(--font-size-6);
	}

	.hero-heading,
	.hero-text {
		flex-wrap: wrap;
		background-color: var(--colour-dark-overlay);
		border-radius: var(--spacing-1);
		max-width: var(--max-width-full);

		padding: var(--spacing-2) var(--spacing-4);
		color: var(--colour-light);
	}

	@media screen and (min-width: 48rem) {
		.hero-heading {
			margin-left: var(--spacing-12);
			margin-top: var(--spacing-12);
			font-size: var(--font-size-7);
		}

		.hero-text {
			display: flex;
			width: fit-content;
		}
	}
</style>
