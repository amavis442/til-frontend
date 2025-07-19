// src/routes/til/new/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

const base = import.meta.env.VITE_BASE_URL;

export const actions: Actions = {
	'create': async ({ request, fetch, locals }) => {
		console.log("A call to new is made");

		const formData = await request.formData();
		const title = formData.get('title')?.toString() ?? '';
		const category = formData.get('category')?.toString() ?? '';
		const content = formData.get('content')?.toString() ?? '';

		if (!locals.user) throw redirect(303, '/login');

		const res = await fetch(`${base}/api/tils`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, category, content }),
			credentials: 'include'
		});

		if (!res.ok) return fail(500, { error: 'Create failed' });

		if (res.status != 201) {
			return fail(500, {error: 'Create failed'});
		}

		throw redirect(303, '/til');
	}
} satisfies Actions;