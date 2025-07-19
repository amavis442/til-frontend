<script lang="ts">
  import { goto } from "$app/navigation";
  import type { TIL } from "$lib/api";
  import { renderMarkdown } from "$lib/utils/renderMarkdown";
  import type { PageProps } from "./$types";
  import { enhance } from "$app/forms";

  let { data, form }: PageProps = $props();
  let til: TIL = $state({ ...data.til });

  console.log(til.content);
</script>

<div class="flex flex-col items-center w-full">
  <div class="grid grid-cols-2 gap-6 w-3/4 mt-6">
    <div>
      <form
        method="POST"
        action="?/edit"
        class="space-y-4 p-6 bg-white rounded-lg shadow-md"
        use:enhance
      >
        <h1 class="text-2xl font-bold">✏️ Edit TIL</h1>

        <input
          name="title"
          bind:value={til.title}
          class="w-full p-2 border rounded"
          placeholder="Title"
          required
        />

        <input
          name="category"
          bind:value={til.category}
          class="w-full p-2 border rounded"
          placeholder="Category"
        />

        <textarea
          name="content"
          bind:value={til.content}
          class="w-full p-2 border rounded h-32"
          placeholder="Markdown content"
          required
        ></textarea>

        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Update
        </button>
      </form>
    </div>
    <div class="p-6 bg-white rounded-lg shadow-md overflow-auto max-h-[80vh]">
      <h2 class="text-lg font-semibold mb-2">🔍 Live Preview</h2>
      <div class="prose max-w-none break-words">
        {@html renderMarkdown(til.content)}
      </div>
    </div>
  </div>
  <a href="/" class="block text-center text-blue-500 hover:underline mt-4"
    >← Back</a
  >
</div>
