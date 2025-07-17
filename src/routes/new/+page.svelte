<script lang="ts">
  import { goto } from "$app/navigation";
  import { createTIL } from "$lib/api";
  import { renderMarkdown } from "$lib/utils/renderMarkdown";

  let title = "";
  let content = "";
  let category = "";

  async function handleSubmit() {
    try {
      await createTIL({ title, content, category });
      goto("/");
    } catch (err) {
      console.error("Create failed", err);
    }
  }
</script>

<div class="flex flex-col items-center w-full">
  <h1 class="text-2xl font-bold mb-4">➕ New TIL</h1>
  <div class="grid grid-cols-2 gap-6 w-3/4 mt-6">
    <div>
      <form
        on:submit|preventDefault={handleSubmit}
        class="space-y-4 min-w-max w-full"
      >
        <input
          bind:value={title}
          class="w-full p-2 border rounded"
          placeholder="Title"
          required
        />
        <input
          bind:value={category}
          class="w-full p-2 border rounded"
          placeholder="Category"
        />
        <textarea
          bind:value={content}
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
        {@html renderMarkdown(content)}
      </div>
    </div>
  </div>
  <a href="/" class="block mt-4 text-blue-500 hover:underline">← Back</a>
</div>
