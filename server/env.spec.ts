import { oneOfEnv } from './env.ts';

const EFFORTS = ['low', 'medium', 'high'] as const;

const effort = () => oneOfEnv({ name: 'AI_EFFORT', values: EFFORTS, fallback: 'medium' });

describe('oneOfEnv', () => {
	afterEach(() => {
		vi.unstubAllEnvs();
		vi.restoreAllMocks();
	});

	it('takes a listed value', () => {
		vi.stubEnv('AI_EFFORT', 'high');

		expect(effort()).toBe('high');
	});

	it.each([undefined, ''])('keeps the default when the variable is %j', (value) => {
		vi.stubEnv('AI_EFFORT', value);

		expect(effort()).toBe('medium');
	});

	it.each(['max', 'HIGH', ' high'])('keeps the default and logs config_invalid for %j', (value) => {
		const log = vi.spyOn(console, 'error').mockImplementation(() => undefined);
		vi.stubEnv('AI_EFFORT', value);

		expect(effort()).toBe('medium');
		expect(log).toHaveBeenCalledWith(
			JSON.stringify({ event: 'config_invalid', name: 'AI_EFFORT', fallback: 'medium' })
		);
	});
});
