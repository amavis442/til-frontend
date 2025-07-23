// src/routes/profile/+page.server.ts
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';


const base = import.meta.env.VITE_BASE_URL;

export const actions: Actions = {
  'change-password': async ({ request, locals }) => {
    const formData = await request.formData();
    const oldPassword = formData.get('oldPassword')?.toString();
    const newPassword = formData.get('newPassword')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();

    if (!oldPassword || !newPassword || !confirmPassword) {
      throw error(400, 'All fields are required');
    }

    if (newPassword !== confirmPassword) {
      throw error(400, 'New passwords do not match');
    }

    const response = await fetch(`${base}/api/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', // Ensures cookies are sent along with the request
        body: JSON.stringify({ oldPassword, newPassword })
      });


    if (!response.ok) {
      throw error(response.status, 'Password change failed');
    }

    // Redirect or show success
    return {
      success: true,
      message: 'Password changed successfully'
    };
  }
};