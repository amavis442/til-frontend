// src/routes/til/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const base = import.meta.env.VITE_BASE_URL;
const isProduction = process.env.NODE_ENV === "production";

export const load: PageServerLoad = async ({ cookies, request, locals, fetch, url }) => {
	if (!isProduction) {
		console.log(`Base is: ${base}`);
		console.log('Call to load of /tils has been made and page is being reloaded.');
	}

	if (!locals.user) {
		console.log("No locals.user somehow.");
		throw redirect(303, '/login');
	}

	const pageLimit = Number(url.searchParams.get('limit')) || 5;
	const pageOffset = Number(url.searchParams.get('offset')) || 0;

	let apiCallUrl = `${base}/api/tils?limit=${pageLimit}&offset=${pageOffset}`;
	console.log("Call to api is: ", apiCallUrl);

	const res = await fetch(apiCallUrl,{credentials:'include'});
	if (!res.ok) {
		throw new Error('Failed to fetch TILs. Code '+ res.status + ": " + res.statusText);
	}

	const data = await res.json();
	let tils = data.items;
	let total = data.total;
	let limit = data.limit;
	let offset = data.offset;

	return { 'tils': tils, 'total': total, 'limit': limit, 'offset': offset };
};

export const actions: Actions = {
	default: async ({ request, fetch, locals }) => {
		if (!isProduction) {
			console.log("A call to search is made");
		}
		const formData = await request.formData();
		const title = formData.get('title')?.toString() ?? '';
		const category = formData.get('category')?.toString() ?? '';

		if (!locals.user) throw redirect(303, '/login');

		const res = await fetch(`${base}/api/tils/search`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, category }),
			credentials: 'include'
		});

		if (!res.ok) return fail(500, { error: 'Search failed' });

		const tils = await res.json();
		if (!isProduction) {
			console.log('Search results are:', tils);
		}
		return { tils };
	},
} satisfies Actions;