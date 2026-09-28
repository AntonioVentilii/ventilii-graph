<script lang="ts">
	/**
	 * Renders model text safely: paragraphs, "- " bullet lists and **bold**,
	 * nothing else. No {@html}: the text comes from a model and is untrusted.
	 */
	interface Props {
		text: string;
	}

	let { text }: Props = $props();

	type Block = { kind: 'p'; lines: string[] } | { kind: 'ul'; items: string[] };

	const BULLET = /^[-*•]\s+/;

	const blocks = $derived.by(() => {
		const out: Block[] = [];
		text.split('\n').forEach((raw) => {
			const line = raw.trim();
			const last = out.at(-1);
			if (!line) {
				out.push({ kind: 'p', lines: [] });
			} else if (BULLET.test(line)) {
				const item = line.replace(BULLET, '');
				if (last?.kind === 'ul') {
					last.items.push(item);
				} else {
					out.push({ kind: 'ul', items: [item] });
				}
			} else if (last?.kind === 'p') {
				last.lines.push(line);
			} else {
				out.push({ kind: 'p', lines: [line] });
			}
		});
		return out.filter((b) => (b.kind === 'p' ? b.lines.length > 0 : b.items.length > 0));
	});

	const segments = (line: string): { bold: boolean; text: string }[] =>
		line
			.split(/(\*\*[^*]+\*\*)/g)
			.filter(Boolean)
			.map((part) =>
				part.startsWith('**') && part.endsWith('**') && part.length > 4
					? { bold: true, text: part.slice(2, -2) }
					: { bold: false, text: part }
			);
</script>

{#snippet inline(line: string)}
	{#each segments(line) as seg, i (i)}
		{#if seg.bold}<strong class="font-bold text-fg">{seg.text}</strong>{:else}{seg.text}{/if}
	{/each}
{/snippet}

<div class="space-y-3 text-sm leading-relaxed text-fg-muted">
	{#each blocks as block, i (i)}
		{#if block.kind === 'ul'}
			<ul class="list-disc space-y-1.5 pl-5">
				{#each block.items as item, j (j)}
					<li>{@render inline(item)}</li>
				{/each}
			</ul>
		{:else}
			<p>
				{#each block.lines as line, j (j)}
					{#if j > 0}<br />{/if}{@render inline(line)}
				{/each}
			</p>
		{/if}
	{/each}
</div>
