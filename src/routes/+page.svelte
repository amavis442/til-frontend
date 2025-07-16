<script lang="ts">
  import { onMount } from "svelte";
  import { getTILs, type TIL, searchTILs } from "$lib/api";
  import { renderMarkdown } from "$lib/utils/renderMarkdown";

  let title = "";
  let category = "";
  let tils: TIL[] = [];

  onMount(async () => {
    try {
      tils = await getTILs();
    } catch (err) {
      console.error(err);
    }
  });

  async function fetchTILs() {
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (category) params.set("category", category);

    tils = await searchTILs(params)
  }
</script>

<div class="grid w-1/2">
  <h1 class="text-3xl font-bold mb-4">📚 Today I Learned</h1>

  <div class="mb-4 flex flex-col gap-2 md:flex-row md:items-end">
    <div>
      <label class="block text-sm font-medium" for="title">Title</label>
      <input
        id="title"
        class="border border-gray-300 p-2 rounded w-full"
        placeholder="Search title..."
        bind:value={title}
      />
    </div>

    <div>
      <label class="block text-sm font-medium" for="category">Category</label>
      <input
        id="category"
        class="border border-gray-300 p-2 rounded w-full"
        placeholder="Category..."
        bind:value={category}
      />
    </div>

    <button
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      on:click={fetchTILs}
    >
      Search
    </button>
  </div>

  <div class="flex flex-col items-center">
    <a href="/new" class="text-blue-600 hover:underline">➕ Add New</a>
    <a href="/category" class="text-blue-600 hover:underline">Category</a>
  </div>

  <div class="flex w-full">
    {#if tils.length > 0}
      <ul class="space-y-6 mt-4 w-full">
        {#each tils as til}
          <li class="p-4 border rounded-lg shadow bg-white">
            <h2 class="text-xl font-semibold">{til.title}</h2>
            <p class="text-sm text-gray-500">{til.category}</p>
            <div class="prose prose-sm max-w-none mt-2">
              {@html renderMarkdown(til.content)}
            </div>
            <p class="text-xs text-gray-400 mt-2">
              {til.created_at &&
                new Intl.DateTimeFormat("nl-NL", {
                  dateStyle: "full",
                  timeStyle: "long",
                  timeZone: "Europe/Amsterdam",
                }).format(new Date(til.created_at))}
            </p>
            <a
              href={`/edit/${til.id}`}
              class="text-green-600 hover:underline ml-2">✏️ Edit</a
            >
          </li>
        {/each}
      </ul>
    {:else}
      <p>No results found.</p>
    {/if}
  </div>
</div>

