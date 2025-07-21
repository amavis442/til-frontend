import type { Handle } from '@sveltejs/kit';
import { getTokenFromCookies, getRefreshTokenFromCookies, setTokenCookie, clearCookies } from '$lib/server/auth/cookies';
import { verifyTokenRS256, isExpired } from '$lib/server/auth/jwt';

const base = import.meta.env.VITE_BASE_URL;
const isProduction = process.env.NODE_ENV === "production";

// Need a test for refresh token in svelte 5
export const handle: Handle = async ({ event, resolve }) => {
	let token = getTokenFromCookies(event);
	const refreshToken = getRefreshTokenFromCookies(event);

	if (!token || isExpired(token)) {
		console.log('Access token missing or expired. Trying to refresh…');

		if (refreshToken && typeof refreshToken === 'string' && refreshToken.trim() !== '') {
			try {
				// Try to refresh token
				const res = await fetch(`${base}/api/token/refresh`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ refresh_token: refreshToken }),
				});

				if (res.ok) {
					const data = await res.json();
					token = data.token;
					if (token && token.trim() != "" && verifyTokenRS256(token) != null) {

						// Set the new token in cookies
						setTokenCookie(event, token);
						console.log('Access token refreshed');
					} else {
						console.log('Access token is either empty or invalid');
					}
				} else {
					clearCookies(event);
					if (!isProduction) {
						console.warn('Refresh token invalid or expired');
					}
				}
			} catch (error) {
				if (process.env.NODE_ENV != "production") {
					console.error('Failed to refresh token:', error);
				}
				clearCookies(event);
			}
		}
	}

	if (token) {
		const payload = verifyTokenRS256(token);
		if (!isProduction) {
			console.log("Payload is", payload);
		}

		if (payload && payload.sub && typeof payload.sub === 'string' && !isNaN(Number(payload.sub))) {
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

/*
if (accessToken) {
		const expired = isExpired(accessToken);

		if (expired && refreshToken) {
			// Try to refresh the access token
			const newToken = await refreshAccessToken(refreshToken);
			if (newToken) {
				event.cookies.set('access_token', newToken, {
					httpOnly: true,
					path: '/',
					sameSite: 'strict',
					secure: true,
					maxAge: 60 * 15
				});
				event.locals.user = parseJWT(newToken);
			} else {
				// Refresh failed → clear cookies
				event.cookies.delete('access_token');
				event.cookies.delete('refresh_token');
			}
		} else {
			// Token exists and is valid
			event.locals.user = parseJWT(accessToken);
		}
	}

	return resolve(event);
*/