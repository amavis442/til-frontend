<script>
  let { children } = $props();
  import "@styles/app.css";
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  {@render children()}
</div>
