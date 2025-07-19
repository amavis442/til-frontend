<script lang="ts">
	let username = '';
	let password = '';
	let error = '';

</script>

<h1>Login</h1>

<form method="POST">
	<input name="username" bind:value={username} required placeholder="username"/>
	<input name="password" type="password" bind:value={password} required placeholder="password"/>
	<button type="submit">Login</button>
</form>

{#if error}
	<p style="color: red">{error}</p>
{/if}

<p>
	New here? <a href="/register">Register</a>
</p>
