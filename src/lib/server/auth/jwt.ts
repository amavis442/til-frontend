import jwt from 'jsonwebtoken';
import fs from 'node:fs';
import path from 'node:path';
import type { RequestEvent } from '@sveltejs/kit';
import { getTokenFromCookies } from '$lib/server/auth/cookies'

// To be used on the server side, because it handle cookies.
// Read the public key once on startup
const publicKeyPath = path.resolve('config/jwt/public.pem');
const PUBLIC_KEY = fs.readFileSync(publicKeyPath, 'utf8');


export function verifyTokenRS256(token: string) {
	try {
		return jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }) as jwt.JwtPayload;
	} catch (err) {
		return null;
	}
}

export function getUserIdFromEvent(event: RequestEvent): string | null {
	const token = getTokenFromCookies(event);
	if (!token) return null;

	const payload = verifyTokenRS256(token);
	if (!payload || !payload.sub) return null;

	return payload.sub.toString();
}

export function isAuthenticated(event: RequestEvent): boolean {
	return getUserIdFromEvent(event) !== null;
}

/**
 * Parses a JWT and returns its payload as an object.
 */
export function parseJWT(token: string): Record<string, any> | null {
	try {
		const payload = token.split('.')[1];
		const decoded = atob(payload);
		return JSON.parse(decoded);
	} catch (e) {
		console.error('Failed to parse JWT:', e);
		return null;
	}
}

/**
 * Checks if the JWT is expired based on its `exp` claim.
 */
export function isExpired(token: string): boolean {
	const payload = parseJWT(token);
	if (!payload || !payload.exp) return true;

	const now = Math.floor(Date.now() / 1000); // current time in seconds
	return payload.exp < now;
}