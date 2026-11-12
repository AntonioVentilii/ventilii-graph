/** An environment variable, with unset and empty both read as absent. */
export const optionalEnv = (name: string): string | undefined => {
	const value = process.env[name];
	return value === undefined || value === '' ? undefined : value;
};

/**
 * A count, an amount or a price from the environment. Only a finite number
 * above zero is taken; anything else falls back to the default and is logged,
 * so a mistyped value runs on the reviewed default instead of on whatever
 * `Number()` makes of it. It does not stop the server: start.sh would take
 * nginx and the whole site down with it.
 */
export const positiveNumberEnv = ({
	name,
	fallback
}: {
	name: string;
	fallback: number;
}): number => {
	const raw = optionalEnv(name);
	if (raw === undefined) {
		return fallback;
	}
	const value = Number(raw);
	if (Number.isFinite(value) && value > 0) {
		return value;
	}
	console.error(JSON.stringify({ event: 'config_invalid', name, fallback }));
	return fallback;
};
