import { portfolioData } from '$lib/services/portfolio.services';

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
