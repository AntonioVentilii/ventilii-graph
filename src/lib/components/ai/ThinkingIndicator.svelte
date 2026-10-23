<script lang="ts">
	import { onMount } from 'svelte';
	import type { Locale } from '$lib/types/portfolio.types';
	import { ASK_COPY, askCopy } from '$lib/utils/ask-copy.utils';

	interface Props {
		locale: Locale;
	}

	let { locale }: Props = $props();

	let step = $state(0);

	onMount(() => {
		const timer = setInterval(() => {
			step = (step + 1) % ASK_COPY.thinking.length;
		}, 3500);
		return () => clearInterval(timer);
	});
</script>

<div
	class="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm text-fg-muted"
	aria-live="polite"
	role="status"
>
	<span class="thinking-dots flex gap-1" aria-hidden="true">
		<span></span><span></span><span></span>
	</span>
	<div class="min-w-0">
		<p class="text-fg">{ASK_COPY.thinking[step][locale]}</p>
		<p class="text-xs text-fg-faint">{askCopy({ key: 'slowNote', locale })}</p>
	</div>
</div>

<style lang="postcss">
	.thinking-dots span {
		width: 0.4rem;
		height: 0.4rem;
		border-radius: 9999px;
		background: var(--accent);
		animation: thinking-bounce 1.2s ease-in-out infinite;
	}
	.thinking-dots span:nth-child(2) {
		animation-delay: 0.15s;
	}
	.thinking-dots span:nth-child(3) {
		animation-delay: 0.3s;
	}
	@keyframes thinking-bounce {
		0%,
		80%,
		100% {
			opacity: 0.3;
			transform: translateY(0);
		}
		40% {
			opacity: 1;
			transform: translateY(-3px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.thinking-dots span {
			animation: none;
			opacity: 0.7;
		}
	}
</style>
