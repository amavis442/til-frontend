<script lang="ts">
	import { post } from '$lib/api';
	import { goto } from '$app/navigation';

	let username = '';
	let email = '';
	let password = '';
	let error = '';
	let success = false;

	async function register() {
		error = '';
		try {
			await post('/auth/register', {
				username,
				email,
				password
			});
			success = true;
			goto('/login');
		} catch (err) {
			error = (err as Error).message;
		}
	}
</script>

<h1>Register</h1>

<form on:submit|preventDefault={register}>
	<input type="email" bind:value={email} placeholder="Email" required />
	<input type="text" bind:value={username} placeholder="Username" required />
	<input type="password" bind:value={password} placeholder="Password" required />
	<button type="submit">Register</button>
</form>

{#if error}
	<p style="color: red">{error}</p>
{/if}
