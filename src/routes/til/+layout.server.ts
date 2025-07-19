// src/routes/til/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
  const token = cookies.get('access_token');

  if (!token) {
    throw redirect(302, '/login');
  }
};
