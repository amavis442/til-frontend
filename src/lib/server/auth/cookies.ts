import type { RequestEvent } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';

export function getTokenFromCookies(event: RequestEvent): string | null {
	return event.cookies.get('access_token') || null;
}

export function getRefreshTokenFromCookies(event: RequestEvent): string | null {
	return event.cookies.get('refresh_token') || null;
}

export function setTokenCookie(event: RequestEvent, newToken?: string | null, cookieOptions: CookieSerializeOptions = {}): boolean {
	if (!newToken) {
		return false;
	}

	const defaultOptions: CookieSerializeOptions = { path: '/', httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 15 };
	const mergedOptions = { ...defaultOptions, ...cookieOptions } as CookieSerializeOptions & { path: string };

	event.cookies.set('access_token', newToken, mergedOptions);
	return true;
}

export function setRefreshTokenCookie(event: RequestEvent, newToken?: string | null, cookieOptions: CookieSerializeOptions = {}): boolean {
	if (!newToken) {
		return false;
	}

	const defaultOptions: CookieSerializeOptions = { path: '/', httpOnly: true, secure: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 };
	const mergedOptions = { ...defaultOptions, ...cookieOptions } as CookieSerializeOptions & { path: string };

	event.cookies.set('refresh_token', newToken, mergedOptions);
	return true;
}

export function clearCookies(event: RequestEvent, cookieNames: string[] = ['access_token', 'refresh_token'], cookieOptions: CookieSerializeOptions = {}) {
	const defaultOptions: CookieSerializeOptions = { path: '/', httpOnly: true, secure: true };
	const deleteOptions = { ...defaultOptions, ...cookieOptions, expires: new Date(0) } as CookieSerializeOptions & { path: string };

	for (const name of cookieNames) {
		event.cookies.delete(name, deleteOptions);
	}
}