<script lang="ts">
  import { post } from "$lib/api";
  import { goto } from "$app/navigation";

  let username = "";
  let email = "";
  let password = "";
  let error = "";
  let success = false;

  async function register() {
    error = "";
    try {
      await post("/auth/register", {
        username,
        email,
        password,
      });
      success = true;
      goto("/login");
    } catch (err) {
      error = (err as Error).message;
    }
  }
</script>

<!-- // 

<form on:submit|preventDefault={register}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="text" bind:value={username} placeholder="Username" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Register</button>
</form>

{#if error}
	<p style="color: red">{error}</p>
{/if}
// -->

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
      Register
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form method="POST" class="space-y-6" on:submit|preventDefault={register}>
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
            autocomplete="email"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900"
          >Email</label
        >
        <div class="mt-2">
          <input
            id="email"
            type="text"
            name="email"
            bind:value={email}
            required
            autocomplete="email"
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
          >Register</button
        >
      </div>
    </form>
    {#if error}
      <p style="color: red">{error}</p>
    {/if}
    <p class="mt-10 text-center text-sm/6 text-gray-500">
      <a
        href="/login"
        class="font-semibold text-indigo-600 hover:text-indigo-500">Login</a
      >
    </p>
  </div>
</div>
