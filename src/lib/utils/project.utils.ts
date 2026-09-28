import type { Locale, Project, ProjectStatus } from '$lib/types/portfolio.types';
import { pickLocale } from '$lib/utils/locale.utils';

const STATUS_LABELS: Record<ProjectStatus, Record<Locale, string>> = {
	production: { en: 'Live', it: 'Live', pt: 'No ar' },
	'in-use': { en: 'In private use', it: 'In uso privato', pt: 'Em uso privado' },
	prototype: { en: 'Prototype', it: 'Prototipo', pt: 'Protótipo' },
	archived: { en: 'Archived', it: 'Archiviato', pt: 'Arquivado' }
};

export const projectStatusLabel = ({
	status,
	locale
}: {
	status: ProjectStatus;
	locale: Locale;
}): string => STATUS_LABELS[status][locale];

/** "Sep 2026-present · In private use": when it was built and how far it got. */
export const projectMeta = ({
	project,
	locale
}: {
	project: Project;
	locale: Locale;
}): string | undefined => {
	const parts = [
		project.dates ? pickLocale({ text: project.dates, locale }) : undefined,
		project.status ? projectStatusLabel({ status: project.status, locale }) : undefined
	].filter((part): part is string => part !== undefined);

	return parts.length > 0 ? parts.join(' · ') : undefined;
};
