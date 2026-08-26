<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import Footer from "$lib/components/Footer.svelte";

	const ACCENT = "#0070c0";
	const RELEASES = "https://github.com/57471C/LS-Video/releases/latest";
	const SOURCE = "https://github.com/57471C/LS-Video";
	const VERSION = "0.6.7";

	const features = [
		{
			title: "Markers, loops & timelines",
			body: "Frame-aware chapter markers, loop regions, and a canvas timeline built for process review — not social video."
		},
		{
			title: "Hard media handled",
			body: "H.265/HEVC, awkward containers, and network paths: local FFmpeg proxy to H.264 when the WebView can’t play the source."
		},
		{
			title: "Batch trim & export",
			body: "Queue clips, join same-class media, optional strip-audio, soft VTT sidecars. Export analysis-friendly packages for TimeStudy."
		},
		{
			title: "DAW-style clip volume",
			body: "Per-clip faders and mute on the timeline; master monitor stays out of the bake. Export uses clip gain only."
		},
		{
			title: "Three view modes",
			body: "Normal workspace for editing, Cinema for focused review, Miniplayer always-on-top for floating playback."
		},
		{
			title: "Local-first & open source",
			body: "No account required. MIT application source; bundled FFmpeg follows its own licence. Auto-updates via lean.studio."
		}
	];

	const modes = [
		{
			name: "Normal",
			desc: "Full workspace — playlist, timeline, markers, data table. Default for project files (.lsv / .lsvz)."
		},
		{
			name: "Cinema",
			desc: "Native fullscreen review. UI fades after idle; Esc returns to Miniplayer."
		},
		{
			name: "Miniplayer",
			desc: "Compact always-on-top player. Opens when you double-click raw media from the OS."
		}
	];
</script>

<svelte:head>
	<title>LS.Video — Process video for lean analysis | Lean Studio</title>
	<meta
		name="description"
		content="LS.Video is a local-first player and hybrid editor for process footage: markers, batch export, H.265 proxy, and a companion path into LS.TimeStudy. Open source."
	/>
	<meta property="og:title" content="LS.Video — Lean Studio" />
	<meta
		property="og:description"
		content="Chapter markers, timeline review, and batch prep for industrial process video. MIT open source."
	/>
	<meta property="og:url" content="https://lean.studio/lsvideo" />
</svelte:head>

<Header />

<main class="flex-1">
	<!-- Hero -->
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
						src="/assets/logos/ls-video.svg"
						alt="LS.Video"
						class="h-20 w-20 md:h-24 md:w-24"
						width="96"
						height="96"
					/>
				</div>
			</div>

			<p class="font-mono text-xs font-semibold uppercase tracking-widest" style="color: {ACCENT}">
				Open source · by Lean Studio
			</p>
			<h1 class="mt-3 font-lean text-4xl tracking-tight text-white sm:text-5xl md:text-6xl">
				LS<span style="color: {ACCENT}">.</span>Video
			</h1>
			<p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
				Process video for the shop floor and the analysis desk. Markers, loops, batch trim, and
				export — including awkward codecs — without a cloud account.
			</p>

			<div class="mt-9 flex flex-wrap items-center justify-center gap-3">
				<a
					href={RELEASES}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
					style="background: {ACCENT}; box-shadow: 0 8px 28px color-mix(in srgb, {ACCENT} 35%, transparent);"
				>
					Download v{VERSION}
				</a>
				<a
					href={SOURCE}
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-medium text-white transition hover:bg-surface-3"
				>
					Source on GitHub
				</a>
			</div>
			<p class="mt-4 text-xs text-text-secondary/80">
				Windows · macOS (Apple Silicon) · Linux · Auto-update from lean.studio
			</p>
		</div>
	</section>

	<!-- Role in suite -->
	<section class="border-b border-border bg-surface-1/40 px-5 py-14">
		<div class="mx-auto max-w-3xl text-center">
			<p class="font-mono text-xs font-semibold uppercase tracking-widest text-text-secondary">
				In the suite
			</p>
			<p class="mt-3 text-sm leading-relaxed text-text-secondary sm:text-base">
				<span class="text-white">LS.Video</span> prepares and reviews process footage.
				<span class="text-white">LS.TimeStudy</span> measures the work. Typical path:
				capture → mark / trim here → analyse there. Also useful as a standalone player and batch editor.
			</p>
		</div>
	</section>

	<!-- Features -->
	<section class="border-b border-border px-5 py-16 md:py-20">
		<div class="mx-auto max-w-6xl">
			<h2 class="font-lean text-2xl text-white sm:text-3xl">Built for process video</h2>
			<p class="mt-2 max-w-2xl text-sm text-text-secondary">
				Not another consumer editor — a local tool for observation, marking, and packaging clips for analysis.
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

	<!-- Modes -->
	<section class="border-b border-border bg-surface-1/30 px-5 py-16">
		<div class="mx-auto max-w-6xl">
			<h2 class="font-lean text-2xl text-white sm:text-3xl">View modes</h2>
			<div class="mt-8 grid gap-4 md:grid-cols-3">
				{#each modes as m}
					<div
						class="rounded-xl border border-border bg-background p-5"
						style="border-color: color-mix(in srgb, {ACCENT} 28%, transparent);"
					>
						<p class="font-mono text-xs font-semibold uppercase tracking-wider" style="color: {ACCENT}">
							{m.name}
						</p>
						<p class="mt-2 text-sm text-text-secondary">{m.desc}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Download block -->
	<section id="download" class="border-b border-border px-5 py-16 md:py-20">
		<div class="mx-auto max-w-3xl text-center">
			<h2 class="font-lean text-2xl text-white sm:text-3xl">Get LS.Video</h2>
			<p class="mt-3 text-sm text-text-secondary">
				Installers for first install; later versions can update in-app when you’re on
				<strong class="text-white">v{VERSION}+</strong> (updater floor).
			</p>
			<a
				href={RELEASES}
				target="_blank"
				rel="noopener noreferrer"
				class="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-110"
				style="background: {ACCENT};"
			>
				Open latest release
			</a>
			<p class="mt-4 text-xs text-text-secondary/70">
				Prefer source?
				<a class="underline hover:text-white" href={SOURCE} target="_blank" rel="noopener noreferrer"
					>github.com/57471C/LS-Video</a
				>
			</p>
		</div>
	</section>

	<!-- Licence note -->
	<section class="px-5 py-12">
		<div class="mx-auto max-w-3xl rounded-2xl border border-border bg-surface-1/60 p-6 text-left text-xs leading-relaxed text-text-secondary">
			<p class="font-medium text-white">Licence</p>
			<p class="mt-2">
				Application source is <strong class="text-white">MIT</strong>. The bundled FFmpeg sidecar
				(including libx264 builds) is under FFmpeg’s own terms (GPL/LGPL as applicable) — not MIT.
				See the repo LICENSE for distribution notes.
			</p>
		</div>
	</section>
</main>

<Footer />
