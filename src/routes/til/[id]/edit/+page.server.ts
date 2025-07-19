// src/routes/til/new/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const base = import.meta.env.VITE_BASE_URL;

export const load: PageServerLoad = async ({ locals, fetch, params }) => {
	console.log(`Base is: ${base}`);
	console.log('Params are: ', params.id);
	let id = params.id;

	console.log(`Call to load til with id ${id} has been made and page is being reloaded.`);

	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const res = await fetch(`${base}/api/tils/${id}`);
	if (!res.ok) {
		throw new Error(`Failed to fetch TIL with id ${id}`);
	}

	const til = await res.json();

	console.log('Request til:', til);
	return { til };
};


export const actions: Actions = {
	'edit': async ({ request, fetch, locals, params }) => {
		console.log("A call to save edit is made");

		const id = params.id;
		const formData = await request.formData();
		const title = formData.get('title')?.toString() ?? '';
		const category = formData.get('category')?.toString() ?? '';
		const content = formData.get('content')?.toString() ?? '';
		console.log('Content is:', content, formData, params);

		if (!locals.user) throw redirect(303, '/login');

		if (!title || !content) {
			return fail(400, {
				error: 'Title and content are required',
				title,
				category,
				content
			});
		}

		const res = await fetch(`${base}/api/tils/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, category, content }),
			credentials: 'include'
		});

		if (!res.ok) return fail(500, { error: 'Edit failed' });

		throw redirect(303, '/til');
	}
} satisfies Actions;