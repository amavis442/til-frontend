<script>
  let { children } = $props();
  import "../app.css";
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  {@render children()}
</div>

<style>
  h1 {
    @apply font-bold size-2;
  }

</style>