<script lang="ts">
    import { goto } from '$app/navigation';
    import { toast } from '@zerodevx/svelte-toast';
  
    async function handleLogout() {
      const res = await fetch('/logout', { method: 'POST' });
  
      if (res.ok) {
        toast.push('👋 You have been logged out.', {
          theme: {
            '--toastBackground': '#1a202c',
            '--toastColor': '#fff',
            '--toastBarBackground': '#2b6cb0'
          }
        });
  
        goto('/login');
      } else {
        toast.push('Logout failed. Try again.' ,{ theme: { '--toastBackground': '#dc2626' } });
      }
    }
  </script>
  
  <nav class="flex justify-between items-center bg-gray-900 text-white px-6 py-4 w-full">
    <div class="text-lg font-bold">🔐 TILApp</div>
    <ul class="flex gap-6 items-center">
      <li><a href="/profile" class="hover:underline">Profile</a></li>
      <li><a href="/profile#change-password" class="hover:underline">Change Password</a></li>
      <li><button on:click={handleLogout} class="hover:underline">Logout</button></li>
    </ul>
  </nav>