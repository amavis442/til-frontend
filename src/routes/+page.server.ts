// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		// If logged in, redirect to TILs
		throw redirect(307, '/til');
	} else {
		// Else, go to login page
		throw redirect(307, '/login');
	}
};