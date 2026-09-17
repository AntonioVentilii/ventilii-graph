<script lang="ts">
	import { page } from '$app/state';

	// nginx serves adapter-static's fallback shell as the body of any 404 (see
	// nginx.conf), and the client-side router lands on this page. Without it a
	// dead link would show SvelteKit's unstyled default with an empty <title>.
	const status = $derived(page.status);
	const message = $derived(
		status === 404 ? 'This page does not exist.' : (page.error?.message ?? 'Something went wrong.')
	);
</script>

<svelte:head>
	<title>{status} | Antonio Ventilii</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="flex min-h-screen flex-col items-center justify-center gap-4 bg-page px-4 text-center">
	<p class="text-sm tracking-widest text-fg-faint uppercase">{status}</p>
	<h1 class="text-2xl font-bold text-fg">{message}</h1>
	<a class="text-link underline transition hover:text-link-hover" href="/">Back to the graph</a>
</main>
