import { PUBLIC_DIRECTUS_PROJECT_URL } from '$env/static/public';
import type { PageQuery } from '$lib/generated/graphql';
import query from '$lib/graphql/query/pages.graphql?raw';
import { getBase64Placeholder } from '$lib/utilities/image';
import { error } from '@sveltejs/kit';
import invariant from 'tiny-invariant';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
	try {
		const response = await fetch(`${PUBLIC_DIRECTUS_PROJECT_URL}/graphql`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
				// 'Authorization': `Bearer ${PUBLIC_SNIPCART_API_KEY}`
			},
			body: JSON.stringify({ query, variables: {} })
		});

		const { headers } = response;
		if (!headers.get('content-type')?.includes('application/json')) {
			const message =
				'No JSON response from Directus. If running in community mode, this pauses automatically after three days. Log into your main account and unpause this project if necessary.';
			console.error(message);
			throw error(503, message);
		}

		const {
			data: { pages, products: rawProducts }
		}: { data: PageQuery } = await response.json();
		const [page] = pages;
		const {
			hero_link: heroLink,
			hero_message: heroMessage,
			hero_title: heroTitle,
			page_title: pageTitle,
			page_description: pageDescription,
			featured_image: featuredImage
		} = page;

		invariant(
			featuredImage && heroLink && heroMessage && heroTitle && pageDescription && pageTitle,
			'Home: description, featured image, hero message, hero title, title  are required'
		);
		const { id, title, description, height, width } = featuredImage;
		invariant(
			description && height && id && title && width,
			'Home: featured image description, height, title and width are required'
		);

		const placeholder = await getBase64Placeholder({ id });

		const products = await Promise.all(
			rawProducts.map(async ({ description, id, image, name, price, slug }) => {
				invariant(
					description && name && price && slug && image,
					`${slug} product description, name, price, slug and image are required`
				);
				const { id: imageId, description: alt } = image;
				invariant(imageId && alt, `${slug} id and description are required for product image`);

				return {
					alt,
					description,
					id,
					name,
					price,
					slug,
					imageId,
					placeholder: await getBase64Placeholder({ id: imageId })
				};
			})
		);

		return {
			featuredImage: { id, title, alt: description, height, width },
			heroLink,
			heroMessage,
			heroTitle,
			pageTitle,
			pageDescription,
			placeholder,
			products
		};
	} catch (err: unknown) {
		const httpError = err as { status: number; message: string };
		if (httpError.message) {
			throw error(httpError.status ?? 500, httpError.message);
		}
		throw error(500, err as string);
	}
};
