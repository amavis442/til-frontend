<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { getTIL, updateTIL } from "$lib/api";
  import type { TIL } from "$lib/api";
  import { page } from "$app/state";
  import { renderMarkdown } from "$lib/utils/renderMarkdown";

  let til: TIL = { title: "", content: "", category: "" };
  let id = "";

  onMount(async () => {
    id = page.params.id;
    til = await getTIL(Number(id));
  });

  async function handleSubmit() {
    try {
      await updateTIL(Number(id), til);
      goto("/");
    } catch (err) {
      console.error("Failed to update TIL", err);
    }
  }
</script>

<div class="flex flex-col items-center w-full">
  <div class="grid grid-cols-2 gap-6 w-3/4 mt-6">
    <div>
      <form
        on:submit|preventDefault={handleSubmit}
        class="space-y-4 p-6 bg-white rounded-lg shadow-md"
      >
        <h1 class="text-2xl font-bold">✏️ Edit TIL</h1>

        <input
          bind:value={til.title}
          class="w-full p-2 border rounded"
          placeholder="Title"
          required
        />

        <input
          bind:value={til.category}
          class="w-full p-2 border rounded"
          placeholder="Category"
        />

        <textarea
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
      <div class="prose  max-w-none break-words">{@html renderMarkdown(til.content)}</div>
    </div>
  </div>
  <a href="/" class="block text-center text-blue-500 hover:underline mt-4"
    >← Back</a
  >
</div>
