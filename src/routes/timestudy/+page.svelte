<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	const ACCENT = "#c00000";
	const VERSION = "0.7.3";

	const features = [
		{
			title: "Element time capture",
			body: "Log operations and tasks against process video. VA / NVA / waste codes, labour, and part data on the same observation."
		},
		{
			title: "Rating, allowances & takt",
			body: "Build rated times, shift capacity, and labour cost per unit from the study — not from a spreadsheet after the fact."
		},
		{
			title: "Multi-trial kaizen",
			body: "Duplicate trials, compare cycles, and show improvement on a dashboard: value-add mix, units per shift, cost per unit."
		},
		{
			title: "Charts that match the floor",
			body: "Gantt, column, and pie views of the study, with takt overlay and labour vs lean grouping."
		},
		{
			title: "Works with LS.Video",
			body: "Prep awkward footage in the open-source player, then measure here. Shared lean workflow; separate commercial license."
		},
		{
			title: "Local-first desktop",
			body: "Tauri app on Windows, macOS, and Linux. Projects stay on disk (.tsp / .tspz). No required cloud account to study."
		}
	];
</script>

<svelte:head>
	<title>LS.TimeStudy — Work measurement for lean analysis | Lean Studio</title>
	<meta
		name="description"
		content="LS.TimeStudy is a local-first desktop app for industrial time and motion study: element capture, ratings, multi-trial kaizen, and a companion path from LS.Video."
	/>
	<meta property="og:title" content="LS.TimeStudy — Lean Studio" />
	<meta
		property="og:description"
		content="Capture cycle times, rate work, and compare trials. Commercial Lean.Studio application."
	/>
	<meta property="og:url" content="https://lean.studio/timestudy" />
</svelte:head>

<Header />

<main class="flex-1">
	<section class="relative overflow-hidden border-b border-border px-5 pb-16 pt-14 md:pb-24 md:pt-20">
		<div
			class="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full blur-[110px]"
			style="background: color-mix(in srgb, {ACCENT} 22%, transparent);"
		></div>

		<div class="relative z-10 mx-auto max-w-4xl text-center">
			<div class="mb-7 flex justify-center">
				<div
					class="rounded-2xl border border-border bg-black p-4 shadow-2xl"
					style="box-shadow: 0 0 40px color-mix(in srgb, {ACCENT} 25%, transparent);"
				>
					<img
						src="/assets/logos/ls-timestudy.svg"
						alt="LS.TimeStudy"
						class="h-20 w-20 md:h-24 md:w-24"
						width="96"
						height="96"
					/>
				</div>
			</div>

			<p class="font-mono text-xs font-semibold uppercase tracking-widest" style="color: {ACCENT}">
				Commercial · by Lean Studio
			</p>
			<h1 class="mt-3 font-lean text-4xl tracking-tight text-white sm:text-5xl md:text-6xl">
				LS<span style="color: {ACCENT}">.</span>TimeStudy
			</h1>
			<p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
				Work measurement at the coal face. Capture elements against video, rate and allow, compare
				trials, and turn observation into standardised work — on your machine.
			</p>

			<div class="mt-9 flex flex-wrap items-center justify-center gap-3">
				<a
					href="#license"
					class="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
					style="background: {ACCENT}; box-shadow: 0 8px 28px color-mix(in srgb, {ACCENT} 35%, transparent);"
				>
					Get a license
				</a>
				<a
					href="/lsvideo"
					class="inline-flex items-center rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-medium text-white transition hover:bg-surface-3"
				>
					Prep video in LS.Video
				</a>
			</div>
			<p class="mt-4 text-xs text-text-secondary/80">
				Windows · macOS (Apple Silicon) · Linux · Current line v{VERSION}
			</p>
		</div>
	</section>

	<section class="border-b border-border bg-surface-1/40 px-5 py-14">
		<div class="mx-auto max-w-3xl text-center">
			<p class="font-mono text-xs font-semibold uppercase tracking-widest text-text-secondary">
				In the suite
			</p>
			<p class="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
				<span class="text-white">LS.Video</span> prepares process footage.
				<span class="text-white">LS.TimeStudy</span> measures the work. Typical path: capture →
				mark / trim in Video → time elements here. Mapper, Sim, and Stats sit further up the chain.
			</p>
		</div>
	</section>

	<section class="border-b border-border px-5 py-16 md:py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="font-lean text-2xl text-white sm:text-3xl">Built for time study</h2>
			<p class="mt-2 max-w-2xl text-sm text-text-secondary">
				Industrial observation software — not a generic stopwatch and not a consumer video editor.
			</p>
			<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{#each features as f}
					<div class="rounded-2xl border border-border bg-surface-1/80 p-5">
						<h3 class="font-lean text-base text-white">{f.title}</h3>
						<p class="mt-2 text-sm leading-relaxed text-text-secondary">{f.body}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section id="license" class="border-b border-border px-5 py-16 md:py-20">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="font-lean text-2xl text-white sm:text-3xl">Licensed product</h2>
			<p class="mt-3 text-sm text-text-secondary">
				LS.TimeStudy is a commercial Lean.Studio application. A product license (Lemon Squeezy key)
				will unlock the desktop app. Installers are not published on a public GitHub release page.
			</p>
			<p class="mt-8 text-sm text-text-secondary">
				Checkout and key redemption are being wired. Until then, get in touch via
				<a class="text-white underline hover:no-underline" href="https://lean.studio">lean.studio</a>.
			</p>
		</div>
	</section>

	<section class="px-5 py-12">
		<div class="mx-auto max-w-3xl rounded-2xl border border-border bg-surface-1/60 p-6 text-left text-xs leading-relaxed text-text-secondary">
			<p class="font-medium text-white">Licence</p>
			<p class="mt-2">
				Application source and binaries are <strong class="text-white">proprietary</strong>.
				A valid product license is required to use the software. Bundled FFmpeg is licensed separately
				(GPL/LGPL as applicable).
			</p>
		</div>
	</section>
</main>

<Footer />
