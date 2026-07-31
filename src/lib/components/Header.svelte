<script lang="ts">
	let menuOpen = $state(false);

	function scrollTo(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		menuOpen = false;
	}
</script>

<header class="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
		<a href="/" class="flex items-center gap-3" aria-label="Lean Studio home">
			<img src="/assets/logos/lean-studio.svg" alt="" class="h-9 w-9" width="36" height="36" />
			<span class="font-lean text-lg tracking-tight">
				<span class="text-white">LEAN</span><span class="text-[0.78em] text-grey">.STUDIO</span>
			</span>
		</a>

		<nav class="hidden items-center gap-7 text-sm text-text-secondary md:flex">
			<button type="button" class="hover:text-white transition-colors" onclick={() => scrollTo("apps")}>Applications</button>
			<button type="button" class="hover:text-white transition-colors" onclick={() => scrollTo("workflow")}>Workflow</button>
			<button type="button" class="hover:text-white transition-colors" onclick={() => scrollTo("open-source")}>Open source</button>
		</nav>

		<div class="hidden md:block">
			<button
				type="button"
				onclick={() => scrollTo("apps")}
				class="rounded-full bg-blue px-4 py-2 text-xs font-semibold text-white hover:brightness-110 transition"
			>
				Explore apps
			</button>
		</div>

		<button
			type="button"
			class="md:hidden text-text-secondary"
			aria-label="Menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{menuOpen ? "Close" : "Menu"}
		</button>
	</div>

	{#if menuOpen}
		<div class="border-t border-border bg-surface-1 px-5 py-4 md:hidden flex flex-col gap-3 text-sm">
			<button type="button" class="text-left text-text-secondary" onclick={() => scrollTo("apps")}>Applications</button>
			<button type="button" class="text-left text-text-secondary" onclick={() => scrollTo("workflow")}>Workflow</button>
			<button type="button" class="text-left text-text-secondary" onclick={() => scrollTo("open-source")}>Open source</button>
		</div>
	{/if}
</header>
