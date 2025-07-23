<script lang="ts">
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";

  let { data, form }: PageProps = $props();
</script>

<div class="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
  <h2 class="text-xl font-semibold mb-4 text-gray-800">🔒 Change Password</h2>

  {#if form?.message}
    <div class="mb-4 text-green-600 font-medium">{form.message}</div>
  {:else if form?.error}
    <div class="mb-4 text-red-600 font-medium">{form.error}</div>
  {/if}

  <form method="POST" action="?/change-password" use:enhance class="space-y-5">
    <div>
      <label class="block text-sm font-medium text-gray-700" for="oldPassword">Old Password</label
      >
      <input
        type="password"
        name="oldPassword"
        required
        class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700" for="newPassword">New Password</label
      >
      <input
        type="password"
        name="newPassword"
        required
        class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700" for="confirmPassword"
        >Confirm Password</label
      >
      <input
        type="password"
        name="confirmPassword"
        required
        class="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
      Change Password
    </button>
  </form>
</div>
