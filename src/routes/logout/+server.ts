// src/routes/logout/+page.server.ts
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { clearCookies } from '$lib/server/auth/cookies'

const base = import.meta.env.VITE_BASE_URL;

export const POST: RequestHandler = async ({ cookies, fetch, request }) => {
  const refreshToken = cookies.get('refreshToken');

  if (refreshToken) {
    await fetch(`${base}/api/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // In case backend relies on cookies too
      body: JSON.stringify({ refreshToken })
    });
  }

  // Clear both tokens from cookies
  clearCookies({ cookies } as any);

  return json({ message: 'You have been logged out successfully.' });
};