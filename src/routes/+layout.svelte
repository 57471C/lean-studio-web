<script lang="ts">
import "../app.css";
import type { Snippet } from "svelte";

interface Props {
	children: Snippet;
}

// biome-ignore lint/correctness/noUnusedVariables: children is rendered in the template markup below
let { children }: Props = $props();
</script>

<div class="flex min-h-[100dvh] flex-col bg-background">
	{@render children()}
</div>
