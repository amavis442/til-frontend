<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageProps, SubmitFunction } from "./$types";
  import { toast } from '@zerodevx/svelte-toast';
  let { form }: PageProps = $props();
  
  let username = $state("");
  let password = $state("");
  let error = $state("");

  $effect(() => {
    if (form?.error) {
      toast.push(form.error);
    }
  });

</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img
      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
      class="mx-auto h-10 w-auto"
    />
    <h2
      class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
    >
      Sign in to your account
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    {#if form?.error}
		  <p class="error text-red-700">{form.error}</p>
	  {/if}
    <form method="POST" class="space-y-6" use:enhance>
      <div>
        <label for="username" class="block text-sm/6 font-medium text-gray-900"
          >Username</label
        >
        <div class="mt-2">
          <input
            id="username"
            type="text"
            name="username"
            bind:value={username}
            required
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm/6 font-medium text-gray-900">Password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            type="password"
            name="password"
            bind:value={password}
            required
            autocomplete="current-password"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Sign in</button
        >
      </div>
    </form>
    {#if error}
      <p style="color: red">{error}</p>
    {/if}

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      New here? <a
        href="/register"
        class="font-semibold text-indigo-600 hover:text-indigo-500">Register</a
      >
    </p>
  </div>
</div>
