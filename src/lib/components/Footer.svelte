<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border bg-surface-1/50 py-12 px-5">
	<div class="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
		<div class="flex items-center gap-3">
			<img src="/assets/logos/lean-studio.svg" alt="" class="h-10 w-10" width="40" height="40" />
			<div>
				<p class="font-lean text-lg">
					<span class="text-white">LEAN</span><span class="text-[0.78em] text-grey">.STUDIO</span>
				</p>
				<p class="text-xs text-text-secondary mt-0.5">Continuous improvement suite</p>
			</div>
		</div>
		<p class="text-xs text-text-secondary max-w-sm">
			Local-first desktop tools for time study, value stream mapping, simulation, and quality analysis.
		</p>
		<p class="text-xs text-text-secondary/70">© {year} Lean Studio</p>
	</div>
</footer>
