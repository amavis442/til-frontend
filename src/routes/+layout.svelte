<script>
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import "@styles/app.css";

  let { children } = $props();
  const options = {}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <SvelteToast {options} />
  {@render children()}
</div>
