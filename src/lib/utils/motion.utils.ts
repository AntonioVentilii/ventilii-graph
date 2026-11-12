/**
 * Whether the visitor asked the system for less motion. False while
 * prerendering, where there is no window to ask.
 */
export const prefersReducedMotion = (): boolean =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
