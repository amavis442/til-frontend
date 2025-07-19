import type { Handle } from '@sveltejs/kit';
import { getTokenFromCookies, verifyTokenRS256 } from '$lib/server/auth/jwt';

export const handle: Handle = async ({ event, resolve }) => {
	const token = getTokenFromCookies(event);

	if (token) {
		const payload = verifyTokenRS256(token);
		console.log("Payload is",payload);

		if (payload && payload.sub) {
			event.locals.user = {
				id: Number(payload.sub),
				username: payload.username ?? null,
				role: payload.role ?? null // Optional if you include role in the token
			};
		} else {
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return resolve(event);
};
