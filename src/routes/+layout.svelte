<script>
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import "@styles/app.css";
  import Nav from "$lib/components/Nav.svelte";
  import { page } from "$app/state";

  let { children } = $props();
  const options = {};

  let showNav = $state(true);
  $effect(() => {
    const excludedPaths = ['/login', '/logout/result', '/register'];
    showNav = !excludedPaths.some(path => page.url.pathname.startsWith(path));
  });
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <SvelteToast {options} />
  <div class="flex-col">
    <div>
      {#if showNav}
        <Nav />
      {/if}
    </div>
    <div>
      {@render children()}
    </div>
  </div>
</div>
