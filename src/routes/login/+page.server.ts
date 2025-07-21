// src/routes/login/+page.server.ts
import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { verifyTokenRS256 } from '$lib/server/auth/jwt';

const base = import.meta.env.VITE_BASE_URL;
const isProduction = process.env.NODE_ENV === "production";

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

		if (process.env.NODE_ENV != "production") {
			console.log(`Access token is: ${access_token}`);
		}

		if (access_token && access_token.trim() != "" && verifyTokenRS256(access_token) != null) {
			cookies.set('access_token', access_token, {
				path: '/',
				httpOnly: true,
				sameSite: isProduction? 'strict':'lax',
				secure: isProduction,
				maxAge: 60 * 15 // Short lived, 15 mins because we can not revoke it
			});
		
			cookies.set('refresh_token', refresh_token, {
				path: '/',
				httpOnly: true,
				sameSite: isProduction? 'strict':'lax',
				secure: isProduction,
				maxAge: 7 * 24 * 60 * 60 // Long lived, can be revoked
			});
		}
		throw redirect(303, '/til');
	}
} satisfies Actions;
