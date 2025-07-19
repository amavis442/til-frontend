<script lang="ts">
  import { goto } from "$app/navigation";
  import { renderMarkdown } from "$lib/utils/renderMarkdown";
  import type { PageProps } from "./$types";
  import type { TIL } from "$lib/api";
  import { enhance } from "$app/forms";

  let { data, form }: PageProps = $props();

  let til: TIL = $state({ title: "", content: "", category: "" });

  </script>

<div class="flex flex-col items-center w-full">
  <h1 class="text-2xl font-bold mb-4">➕ New TIL</h1>
  <div class="grid grid-cols-2 gap-6 w-3/4 mt-6">
    <div>
      <form
        method="POST"
        action="?/create"
        use:enhance
        class="space-y-4 min-w-max w-full"
      >
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
          placeholder="What did you learn?"
          required
        ></textarea>
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >Save</button
        >
      </form>
    </div>

    <div class="p-6 bg-white rounded-lg shadow-md overflow-auto max-h-[80vh]">
      <h2 class="text-lg font-semibold mb-2">🔍 Live Preview</h2>
      <div class="prose max-w-none break-words">
        {@html renderMarkdown(til.content)}
      </div>
    </div>
  </div>
  <a href="/" class="block mt-4 text-blue-500 hover:underline">← Back</a>
</div>
