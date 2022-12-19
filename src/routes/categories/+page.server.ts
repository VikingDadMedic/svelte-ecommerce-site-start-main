import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = function get() {
	throw redirect(301, '/products');
};
