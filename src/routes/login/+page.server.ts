// src/routes/login/+page.server.ts
import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const base = import.meta.env.VITE_BASE_URL;

export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');

		console.log(`Url is: ${base}/auth/login`);

		const res = await fetch(`${base}/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		if (!res.ok) {
			return fail(401, { error: 'Invalid credentials' });
		}

		const { access_token, refresh_token } = await res.json();

		console.log(`Access token is: ${access_token}`);

		cookies.set('access_token', access_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60
		});
		cookies.set('refresh_token', refresh_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 7 * 24 * 60 * 60
		});

		throw redirect(303, '/til');
	}
} satisfies Actions;
