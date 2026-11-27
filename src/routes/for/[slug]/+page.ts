import {
	VISIT_RECIPIENTS,
	type VisitRecipient,
	findRecipient
} from '#lib/utils/visit-recipients.utils.ts';
import { error } from '@sveltejs/kit';

export const prerender = true;
export const ssr = true;
export const trailingSlash = 'always';

// Only the readers listed in visit-recipients.utils.ts get a page; any other
// slug is a plain 404.
export const entries = (): { slug: string }[] => VISIT_RECIPIENTS.map(({ slug }) => ({ slug }));

export const load = ({ params }: { params: { slug: string } }): { recipient: VisitRecipient } => {
	const recipient = findRecipient(params.slug);
	if (!recipient) {
		error(404);
	}
	return { recipient };
};
