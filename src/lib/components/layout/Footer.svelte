<script lang="ts">
	import { portfolioData } from '$lib/services/portfolio.services';

	// Evaluated at prerender time, so this is the year of the last release
	// build — which is what a copyright line should say anyway.
	const year = new Date().getFullYear();
</script>

<footer class="w-full border-t border-border bg-page">
	<div
		class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-fg-faint lg:flex-row lg:justify-start lg:gap-12 lg:px-8"
	>
		<span>© {year} {portfolioData.person.name}</span>
	</div>
</footer>
