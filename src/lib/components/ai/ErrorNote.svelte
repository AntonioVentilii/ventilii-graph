<script lang="ts">
	import type { AiErrorCode } from '$lib/types/ai.types';
	import type { Locale } from '$lib/types/portfolio.types';
	import { askCopy } from '$lib/utils/ask-copy.utils';

	interface Props {
		error: AiErrorCode;
		locale: Locale;
		email: string;
	}

	let { error, locale, email }: Props = $props();

	const message = $derived.by(() => {
		switch (error) {
			case 'rate_limited':
				return askCopy({ key: 'errorRateLimited', locale });
			case 'daily_cap':
				return askCopy({ key: 'errorDailyCap', locale });
			case 'busy':
				return askCopy({ key: 'errorBusy', locale });
			case 'refused':
				return askCopy({ key: 'errorRefused', locale });
			case 'unconfigured':
				return askCopy({ key: 'offline', locale });
			default:
				return askCopy({ key: 'errorGeneric', locale });
		}
	});
</script>

<p class="rounded-2xl border border-border-strong bg-card p-4 text-sm text-fg-muted" role="alert">
	{message}
	<a class="ml-1 text-link underline underline-offset-2 hover:text-link-hover" href="mailto:{email}"
		>{email}</a
	>
</p>
