<script lang="ts">
  type PaginationData = {
    total: number;
    limit: number;
    offset: number;
  };
  let { data, linkBuilder }: {
    data: PaginationData;
    linkBuilder: (page: number, limit: number) => string;
  } = $props();

  /*
  let linkBuilder: (page: number, limit: number) => string = (page, limit) =>
    `?limit=${limit}&offset=${page * limit}`;
  */

  let pagesStore = $derived(() => Math.ceil(data.total / data.limit));
  let currentPageStore = $derived(() => Math.floor(data.offset / data.limit));

  let pages: number = $state(0);
  let currentPage: number = $state(0);

  let total: number = $state(0);
  let limit: number = $state(5);
  let offset: number = $state(0);

  $effect(() => {
    pages = pagesStore();
    currentPage = currentPageStore();
    total = data.total;
    limit = data.limit;
    offset = data.offset;
    });
</script>

{#if pages > 0}
  <ul class="inline-flex -space-x-px rtl:space-x-reverse items-center">
    <li>
      <a
        href="{linkBuilder(0, limit)}"
        class="flex items-center font-medium h-8 px-3 text-sm text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border"
      >
        first
      </a>
    </li>
    {#each Array.from({ length: pages }, (_, i) => i) as page}
        <li aria-current={page === currentPage ? 'page' : undefined}>
          <a
            href="{linkBuilder(page, limit)}"
            class="flex items-center {page === currentPage ? 'font-bold underline' : ''} font-medium h-8 px-3 text-sm text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border"
            >
            {page + 1}
          </a>
        </li>
    {/each}
    <li>
      <a
        href="{linkBuilder(pages - 1, limit)}"
        class="flex items-center font-medium h-8 px-3 text-sm text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border"
      >
        last
      </a>
    </li>
  </ul>
{/if}
