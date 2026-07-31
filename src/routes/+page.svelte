<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import AppCard from "$lib/components/AppCard.svelte";
	import { CORE_APPS, SUPPORT_APPS } from "$lib/apps";
</script>

<Header />

<main class="flex-1">
	<!-- Hero -->
	<section class="relative overflow-hidden px-5 pb-20 pt-16 md:pt-24">
		<div
			class="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue/15 blur-[100px]"
		></div>
		<div
			class="pointer-events-none absolute left-10 top-32 h-64 w-64 rounded-full bg-red/10 blur-[80px]"
		></div>
		<div
			class="pointer-events-none absolute right-10 top-40 h-64 w-64 rounded-full bg-orange/10 blur-[80px]"
		></div>

		<div class="relative z-10 mx-auto max-w-3xl text-center">
			<div class="mb-8 flex justify-center">
				<div class="rounded-2xl border border-border bg-black p-4 shadow-2xl shadow-blue/10">
					<img
						src="/assets/logos/lean-studio.svg"
						alt="Lean Studio"
						class="h-20 w-20 md:h-24 md:w-24"
						width="96"
						height="96"
					/>
				</div>
			</div>

			<h1 class="font-lean text-4xl tracking-tight text-white sm:text-5xl md:text-6xl">
				Process tools for<br class="hidden sm:inline" />
				<span class="text-text-secondary">lean manufacturing</span>
			</h1>
			<p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
				A focused suite for time study, mapping, simulation, and quality analysis — plus open-source
				helpers for video and PDF. Local-first. Built for the coal face and the 30,000&nbsp;ft view.
			</p>
			<div class="mt-9 flex flex-wrap items-center justify-center gap-3">
				<a
					href="#apps"
					class="inline-flex items-center rounded-full bg-blue px-6 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
				>
					See the apps
				</a>
				<a
					href="#open-source"
					class="inline-flex items-center rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-medium text-white hover:bg-surface-3 transition"
				>
					Open source tools
				</a>
			</div>
		</div>
	</section>

	<!-- Core apps -->
	<section id="apps" class="border-t border-border bg-surface-1/40 px-5 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-12 max-w-2xl">
				<p class="font-mono text-xs font-semibold uppercase tracking-widest text-blue">Suite</p>
				<h2 class="mt-2 font-lean text-3xl text-white sm:text-4xl">Core applications</h2>
				<p class="mt-3 text-sm text-text-secondary sm:text-base">
					Commercial tools for measurement, mapping, simulation, and stats. Use them standalone or
					as one workflow.
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
				{#each CORE_APPS as app}
					<AppCard {app} />
				{/each}
			</div>
		</div>
	</section>

	<!-- Workflow strip -->
	<section id="workflow" class="border-t border-border px-5 py-16">
		<div class="mx-auto max-w-6xl">
			<p class="font-mono text-xs font-semibold uppercase tracking-widest text-blue">Connected workflow</p>
			<h2 class="mt-2 font-lean text-2xl text-white sm:text-3xl">Coal face → big picture</h2>
			<ol class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<li class="rounded-xl border border-border bg-surface-1 p-5">
					<span class="font-mono text-xs text-red">01</span>
					<p class="mt-2 font-lean text-white">LS.Video + LS.TimeStudy</p>
					<p class="mt-1 text-xs text-text-secondary">Prep footage, then measure cycle times on the floor.</p>
				</li>
				<li class="rounded-xl border border-border bg-surface-1 p-5">
					<span class="font-mono text-xs text-stats">02</span>
					<p class="mt-2 font-lean text-white">LS.Stats</p>
					<p class="mt-1 text-xs text-text-secondary">Capability, Gage R&R, and quality analysis on the data.</p>
				</li>
				<li class="rounded-xl border border-border bg-surface-1 p-5">
					<span class="font-mono text-xs text-plumb">03</span>
					<p class="mt-2 font-lean text-white">LS.Sim</p>
					<p class="mt-1 text-xs text-text-secondary">Model the line before you change it.</p>
				</li>
				<li class="rounded-xl border border-border bg-surface-1 p-5">
					<span class="font-mono text-xs text-orange">04</span>
					<p class="mt-2 font-lean text-white">LS.Mapper</p>
					<p class="mt-1 text-xs text-text-secondary">Value stream and process view at 30,000&nbsp;ft.</p>
				</li>
			</ol>
		</div>
	</section>

	<!-- Open source supporting -->
	<section id="open-source" class="border-t border-border bg-surface-1/40 px-5 py-20">
		<div class="mx-auto max-w-6xl">
			<div class="mb-12 max-w-2xl">
				<p class="font-mono text-xs font-semibold uppercase tracking-widest text-grey">Open source</p>
				<h2 class="mt-2 font-lean text-3xl text-white sm:text-4xl">Supporting tools</h2>
				<p class="mt-3 text-sm text-text-secondary sm:text-base">
					MIT-licensed apps that plug into the suite. Bundled for convenience; fully available to the
					public on their own.
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2">
				{#each SUPPORT_APPS as app}
					<AppCard {app} />
				{/each}
			</div>

			<p class="mt-8 text-xs text-text-secondary">
				speedDF keeps its own brand and site.
				<a class="text-blue hover:underline" href="https://speeddf.com" rel="noopener noreferrer" target="_blank"
					>speeddf.com</a
				>
				· LS.Video is the open-source video companion for TimeStudy.
			</p>
		</div>
	</section>
</main>

<Footer />
