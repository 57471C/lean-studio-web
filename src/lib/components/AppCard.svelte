<script lang="ts">
	import type { AppInfo } from "$lib/apps";

	interface Props {
		app: AppInfo;
	}
	let { app }: Props = $props();

	const statusLabel: Record<string, string> = {
		available: "Available",
		beta: "Beta",
		coming: "In development",
	};
</script>

<article
	class="group relative flex flex-col rounded-2xl border border-border bg-surface-1/80 p-6 transition hover:-translate-y-0.5 hover:border-white/15"
	style="box-shadow: 0 0 0 1px color-mix(in srgb, {app.accent} 12%, transparent);"
>
	<div class="mb-5 flex items-start justify-between gap-3">
		<div
			class="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-black p-1.5"
		>
			<img src={app.logo} alt="" class="h-full w-full object-contain" width="48" height="48" />
		</div>
		<span
			class="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide"
			style="color: {app.accent}; background: color-mix(in srgb, {app.accent} 15%, transparent);"
		>
			{statusLabel[app.status]}
		</span>
	</div>

	{#if app.prefixAccent}
		<h3
			class="text-xl font-bold tracking-tight text-slate-50"
			class:font-display={app.titleFont === "display"}
			class:font-lean={app.titleFont !== "display"}
		>
			{app.prefix}<span style="color: {app.accent}">{app.prefixAccent}</span>
		</h3>
	{:else}
		<h3 class="font-lean text-xl text-white">
			{app.prefix}
		</h3>
	{/if}
	<p class="mt-1 text-xs font-medium" style="color: {app.accent}">{app.tagline}</p>
	<p class="mt-3 text-sm leading-relaxed text-text-secondary">{app.description}</p>

	<ul class="mt-5 space-y-1.5 text-xs text-text-secondary">
		{#each app.features as feat}
			<li class="flex gap-2">
				<span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style="background: {app.accent}"></span>
				{feat}
			</li>
		{/each}
	</ul>

	{#if app.openSource}
		<p class="mt-5 text-[10px] uppercase tracking-wider text-text-secondary/80">Open source · MIT</p>
	{/if}
</article>
