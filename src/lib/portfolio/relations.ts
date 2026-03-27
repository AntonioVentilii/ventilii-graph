import { portfolioData } from '$lib/data/portfolio.data';

export function relatedProjectsForStack(stackId: string) {
	return portfolioData.projects.filter((p) => p.stackIds?.includes(stackId));
}

export function relatedStackForProject(projectId: string) {
	const p = portfolioData.projects.find((x) => x.id === projectId);
	if (!p?.stackIds) return [];
	return portfolioData.technologies.filter((s) => p.stackIds!.includes(s.id));
}
