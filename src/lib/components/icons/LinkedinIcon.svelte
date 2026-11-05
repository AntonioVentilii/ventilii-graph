<script lang="ts">
	import { Icon, type IconNode, type LucideIconData, type LucideProps } from '@lucide/svelte';

	// Lucide 1.x dropped its brand icons; this is the `linkedin` icon as it shipped
	// in lucide-svelte 0.577 (ISC), drawn through Lucide's own Icon component so
	// it keeps the same props and stroke style as the other icons.
	const iconNode: IconNode = [
		[
			'path',
			{ d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }
		],
		['rect', { width: '4', height: '12', x: '2', y: '9' }],
		['circle', { cx: '4', cy: '4', r: '2' }]
	];

	const icon: LucideIconData = { name: 'linkedin', size: 24, node: iconNode };

	let props: LucideProps = $props();
</script>

<Icon {...props} {icon} />
