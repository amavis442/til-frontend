<script lang="ts">
  import { type TIL } from "$lib/api";
  import { renderMarkdown } from "$lib/utils/renderMarkdown";
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";
  import Pagination from '$lib/components/pagination.svelte'; // adjust path

  let { data, form }: PageProps = $props();
  let tils: TIL[] = $state([]);

  $effect(() => {
    if (form?.tils) {
      tils = form.tils;
    } else {
      tils = data.tils;
    }
  });

  // Optional override for link generation
  const buildLink = (page: number, limit: number) =>
    `/til?limit=${limit}&offset=${page * limit}`;

</script>

<div class="flex flex-col gap-2 w-full">
  <div class="block w-full mb-4">
    <div class="text-3xl font-bold mb-4">📚 Today I Learned</div>
  </div>

  <div class="mb-4 flex flex-col gap-2 md:flex-row md:items-end">
    <form
      method="POST"
      class="mb-4 flex flex-col gap-2 md:flex-row md:items-end"
      use:enhance
    >
      <div>
        <label class="block text-sm font-medium" for="title">Title</label>
        <input
          id="title"
          name="title"
          class="border border-gray-300 p-2 rounded w-full"
          placeholder="Search title..."
        />
      </div>

      <div>
        <label class="block text-sm font-medium" for="category">Category</label>
        <input
          id="category"
          name="category"
          class="border border-gray-300 p-2 rounded w-full"
          placeholder="Category..."
        />
      </div>

      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  </div>

  <Pagination {data}  linkBuilder={buildLink} />

 

  <div class="flex w-full">
    <div class="p-2 rounded border-1 mr-2">
      <a href="/til/new" class="text-blue-600 hover:underline">➕ Add New</a>
    </div>
    <!--// to be implemented //-->
    <!-- // 
    <div class="p-2 rounded border-1 mr-2"><a href="/til/category" class="text-blue-600 hover:underline">Category</a></div>
    // -->
  </div>

  <div class="flex w-full tils">
    {#if tils.length > 0}
      <ul class="space-y-6 mt-4 w-full">
        {#each tils as til}
          <li class="p-4 border rounded-lg shadow bg-white">
            <h2 class="text-xl font-semibold">{til.title}</h2>
            <p class="text-sm text-gray-500">{til.category}</p>
            <article class="prose prose-slate max-w-none mt-2">
              {@html renderMarkdown(til.content)}
            </article>
            <p class="text-xs text-gray-400 mt-2 mb-4">
              {til.created_at &&
                new Intl.DateTimeFormat("nl-NL", {
                  dateStyle: "full",
                  timeStyle: "long",
                  timeZone: "Europe/Amsterdam",
                }).format(new Date(til.created_at))}
            </p>
            <div class="mt-2">
              <a
                href={`/til/${til.id}/edit`}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >✏️ Edit</a
              >
            </div>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No results found.</p>
    {/if}
  </div>
</div>