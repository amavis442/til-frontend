// src/routes/register/+page.server.ts
import { redirect, fail } from '@sveltejs/kit';
import type { Actions } from './$types';

const base = import.meta.env.VITE_BASE_URL;
const isProduction = process.env.NODE_ENV === "production";


export const actions: Actions = {
    default: async ({ request, fetch }) => {
        const form = await request.formData();
		const username = form.get('username');
		const password = form.get('password');
        const email = form.get('email');

		console.log(`Url is: ${base}/auth/register`);
		if (isProduction) {
			console.log("Running in prod mode");
		} else {
			console.log("Running in dev mode");
		}
		const res = await fetch(`${base}/auth/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({  
                username,
                email,
                password, })
		});

		if (!res.ok) {
			return fail(401, { error: 'Could not register' });
		}
        throw redirect(303, '/login');
    }

} satisfies Actions;