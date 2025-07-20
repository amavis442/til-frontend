<script lang="ts">
  import { type TIL } from "$lib/api";
  import { renderMarkdown } from "$lib/utils/renderMarkdown";
  import { enhance } from "$app/forms";
  import type { PageProps } from "./$types";

  let { data, form }: PageProps = $props();
  let tils: TIL[] = $state([]);
  let total = $state(0);
  let limit = $state(5);
  let offset = $state(0);
  let pages = $state(0);
  let currentPage = $state(0);

  $effect(() => {
    if (form?.tils) {
      tils = form.tils;
    } else {
      tils = data.tils;
      total = data.total;
      limit = data.limit;
      offset = data.offset;
      console.log("Total is ", total);
      pages = Math.ceil(total / limit);
      console.log("Total pages ", pages);

      currentPage = Math.floor(offset / limit);
      console.log(currentPage);
    }
  });
</script>

<div class="flex flex-col gap-2 w-1/2">
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

  {#if pages > 0}
    <ul class="inline-flex -space-x-px rtl:space-x-reverse items-center">
      {#each { length: pages }, page}
        {#if page == 0}
          <li>
            <a
              href="/til?limit={limit}&offset={page * limit}"
              class="flex items-center font-medium h-8 px-3 text-sm text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border"
            >
              first</a
            >
          </li>
        {/if}
        {#if page == currentPage}
          <li aria-current="page">
            <a
              href="/til?limit={limit}&offset={page * limit}"
              class="flex items-center bold font-medium h-8 px-3 text-sm text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border"
            >
              [{page + 1}]</a
            >
          </li>
        {:else}
          <li>
            <a
              href="/til?limit={limit}&offset={page * limit}"
              class="flex items-center font-medium h-8 px-3 text-sm text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border"
            >
              {page + 1}</a
            >
          </li>
        {/if}

        {#if page >= pages - 1}
          <li>
            <a
              href="/til?limit={limit}&offset={page * limit}"
              class="flex items-center font-medium h-8 px-3 text-sm text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border"
            >
              last</a
            >
          </li>
        {/if}
      {/each}
    </ul>
  {/if}

  <div class="flex w-full">
    <div class="p-2 rounded border-1 mr-2">
      <a href="/til/new" class="text-blue-600 hover:underline">➕ Add New</a>
    </div>
    <!--// to be implemented //-->
    <!-- // 
    <div class="p-2 rounded border-1 mr-2"><a href="/til/category" class="text-blue-600 hover:underline">Category</a></div>
    // -->
    <div class="p-2 rounded border-1"><a href="/logout">Logout</a></div>
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
            <p class="text-xs text-gray-400 mt-2">
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
