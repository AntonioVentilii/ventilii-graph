<script lang="ts">
	import { Icon, type IconNode, type LucideIconData, type LucideProps } from '@lucide/svelte';

	// Lucide 1.x dropped its brand icons; this is the `github` icon as it shipped
	// in lucide-svelte 0.577 (ISC), drawn through Lucide's own Icon component so
	// it keeps the same props and stroke style as the other icons.
	const iconNode: IconNode = [
		[
			'path',
			{
				d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4'
			}
		],
		['path', { d: 'M9 18c-4.51 2-5-2-7-2' }]
	];

	const icon: LucideIconData = { name: 'github', size: 24, node: iconNode };

	let props: LucideProps = $props();
</script>

<Icon {...props} {icon} />
