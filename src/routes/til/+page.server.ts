// src/routes/til/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const base = import.meta.env.VITE_BASE_URL;

export const load: PageServerLoad = async ({ locals, fetch, url }) => {
	console.log(`Base is: ${base}`);
	console.log('Call to load of /tils has been made and page is being reloaded.');
	
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const pageLimit = Number(url.searchParams.get('limit')) || 5;
    const pageOffset = Number(url.searchParams.get('offset')) || 0;
	console.log(pageLimit, pageOffset);

	const res = await fetch(`${base}/api/tils?limit=${pageLimit}&offset=${pageOffset}`);
	if (!res.ok) {
		throw new Error('Failed to fetch TILs');
	}

	const data = await res.json();
	let tils = data.items;
	let total = data.total;
	let limit = data.limit;
	let offset = data.offset;

	return { 'tils': tils,'total': total, 'limit': limit, 'offset': offset };
};

export const actions: Actions = {
	default: async ({ request, fetch, locals }) => {
		console.log("A call to search is made");

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
		console.log('Search results are:', tils);
		return { tils };
	},
} satisfies Actions;