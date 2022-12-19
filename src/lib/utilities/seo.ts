import { PUBLIC_SITE_URL } from '$env/static/public';
import type { Graph, ImageObject, Product, SearchAction, WebSite } from 'schema-dts';
import { Temporal } from '@js-temporal/polyfill';
import website from '$lib/configuration/website';

const { siteTitle, siteShortTitle: siteTitleAlt, siteLanguage } = website;

interface GetProductSchemaInput {
    name: string;
    description: string;
    gtin?: string;
    src: string;
    price: number;
    slug: string;
    sku?: string;
}

export function getProductSchema({
    name,
    description,
    gtin,
    src,
    price,
    slug,
    sku
}: GetProductSchemaInput) {
    const url = `${PUBLIC_SITE_URL}/products/${slug}`;
    const product: Product = {
        '@type': 'Product',
        '@id': `${url}#product`,
        url,
        name,
        description,
        ...(gtin ? { gtin14: gtin } : {}),
        ...(sku ? { sku } : {}),
        image: {
            '@type': 'ImageObject',
            '@id': `${url}#product`
        },
        offers: {
            '@type': 'Offer',

            availability: 'OnlineOnly',
            price: (price / 100),
            priceCurrency: 'USD',
            priceValidUntil: Temporal.Now.plainDateTimeISO()
                .round({ smallestUnit: 'hour' })
                .add({ months: 1 })
                .toString()
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            '@id': `${url}#reviews`,
            ratingValue: 4.4,
            reviewCount: 89,
            bestRating: 5,
            worstRating: 1
        }
    };

    const image: ImageObject = {
        '@type': 'ImageObject',
        '@id': `${url}#primaryimage`,
        inLanguage: siteLanguage,
        url: `${PUBLIC_SITE_URL}${src}`,
        contentUrl: `${PUBLIC_SITE_URL}${src}`,
        width: '512',
        height: '512',
        caption: description
    };

    type QueryAction = SearchAction & {
        'query-input': string
    }

    const queryAction: QueryAction = {
        '@type': 'SearchAction',
        target: `${PUBLIC_SITE_URL}/products?s={search_term_string}`,
        'query-input': 'required name=search_term_string'
    };

    const website: WebSite & { potentialAction: QueryAction } = {
        '@type': 'WebSite',
        '@id': `${PUBLIC_SITE_URL}/#website`,
        url: PUBLIC_SITE_URL,
        name: siteTitle,
        description: siteTitleAlt,
        potentialAction: queryAction,
        inLanguage: siteLanguage
    };

    const schemaOrgObject: Graph = {
        '@context': 'https://schema.org',
        '@graph': [website, product, image]
    };

    return JSON.stringify(schemaOrgObject);
}
