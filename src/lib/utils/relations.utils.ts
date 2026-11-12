import { portfolioData } from '#lib/services/portfolio.services.ts';
import type { Experience, Project } from '#lib/types/portfolio.types.ts';

export const relatedProjectsForStack = (stackId: string) =>
	portfolioData.projects.filter((p) => p.stackIds?.includes(stackId));

export const relatedStackForProject = (projectId: string) => {
	const p = portfolioData.projects.find((x) => x.id === projectId);
	if (!p?.stackIds) {
		return [];
	}
	const { stackIds } = p;
	return portfolioData.technologies.filter((s) => stackIds.includes(s.id));
};

/** The projects an experience lists, in its order, skipping ids that match none. */
export const relatedProjectsForExperience = ({
	experience
}: {
	experience: Experience;
}): Project[] =>
	(experience.projectIds ?? []).flatMap((id) => {
		const project = portfolioData.projects.find((p) => p.id === id);
		return project ? [project] : [];
	});
