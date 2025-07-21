import { describe, it, expect } from 'vitest';
import { setTokenCookie } from './cookies';
import type { RequestEvent } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';

function createEventMock() {
	let lastSet: { name: string; value: string; options: CookieSerializeOptions & { path: string } } | null = null;
	return {
		cookies: {
			set: (name: string, value: string, options: CookieSerializeOptions & { path: string }) => {
				lastSet = { name, value, options };
			}
		},
		getLastSet: () => lastSet
	} as unknown as RequestEvent & { getLastSet: () => typeof lastSet };
}

describe('setTokenCookie', () => {
	it('test_set_token_cookie_sets_cookie_with_defaults', () => {
		const event = createEventMock();
		const token = 'abc123';
		const result = setTokenCookie(event, token);

		const lastSet = (event as any).getLastSet();
		expect(result).toBe(true);
		expect(lastSet).not.toBeNull();
		expect(lastSet.name).toBe('access_token');
		expect(lastSet.value).toBe(token);
		expect(lastSet.options).toMatchObject({
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 15
		});
	});

	it('test_set_token_cookie_merges_custom_options', () => {
		const event = createEventMock();
		const token = 'customtoken';
		const customOptions: CookieSerializeOptions = {
			httpOnly: false,
			secure: false,
			maxAge: 1000,
			sameSite: 'strict',
			domain: 'example.com'
		};
		const result = setTokenCookie(event, token, customOptions);

		const lastSet = (event as any).getLastSet();
		expect(result).toBe(true);
		expect(lastSet).not.toBeNull();
		expect(lastSet.name).toBe('access_token');
		expect(lastSet.value).toBe(token);
		expect(lastSet.options).toMatchObject({
			path: '/',
			httpOnly: false,
			secure: false,
			sameSite: 'strict',
			maxAge: 1000,
			domain: 'example.com'
		});
	});

	it('test_set_token_cookie_returns_true_on_success', () => {
		const event = createEventMock();
		const token = 'successToken';
		const result = setTokenCookie(event, token);
		expect(result).toBe(true);
	});

	it('test_set_token_cookie_returns_false_on_undefined_token', () => {
		const event = createEventMock();
		const result = setTokenCookie(event, undefined);
		const lastSet = (event as any).getLastSet();
		expect(result).toBe(false);
		expect(lastSet).toBeNull();
	});

	it('test_set_token_cookie_returns_false_on_null_token', () => {
		const event = createEventMock();
		const result = setTokenCookie(event, null);
		const lastSet = (event as any).getLastSet();
		expect(result).toBe(false);
		expect(lastSet).toBeNull();
	});

	it('test_set_token_cookie_applies_default_options', () => {
		const event = createEventMock();
		const token = 'defaultOptionsToken';
		setTokenCookie(event, token);

		const lastSet = (event as any).getLastSet();
		expect(lastSet.options).toMatchObject({
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			maxAge: 60 * 15
		});
	});
});