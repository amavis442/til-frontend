import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import type { RequestEvent } from '@sveltejs/kit';

// To be used on the server side, because it handle cookies.
// Read the public key once on startup
const publicKeyPath = path.resolve('config/jwt/public.pem');
const PUBLIC_KEY = fs.readFileSync(publicKeyPath, 'utf8');

export function getTokenFromCookies(event: RequestEvent): string | null {
	return event.cookies.get('access_token') || null;
}

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
