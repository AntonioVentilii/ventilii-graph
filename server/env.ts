/** An environment variable, with unset and empty both read as absent. */
export const optionalEnv = (name: string): string | undefined => {
	const value = process.env[name];
	return value === undefined || value === '' ? undefined : value;
};

// A number from the environment, taken only when `valid` accepts it; anything
// else falls back to the default and is logged, so a mistyped value runs on
// the reviewed default instead of on whatever `Number()` makes of it. It does
// not stop the server: start.sh would take nginx and the whole site down with
// it.
const numberEnv = ({
	name,
	fallback,
	valid
}: {
	name: string;
	fallback: number;
	valid: (value: number) => boolean;
}): number => {
	const raw = optionalEnv(name);
	if (raw === undefined) {
		return fallback;
	}
	const value = Number(raw);
	if (valid(value)) {
		return value;
	}
	console.error(JSON.stringify({ event: 'config_invalid', name, fallback }));
	return fallback;
};

/** A count, an amount or a price: a finite number above zero. */
export const positiveNumberEnv = ({ name, fallback }: { name: string; fallback: number }): number =>
	numberEnv({ name, fallback, valid: (value) => Number.isFinite(value) && value > 0 });

/** A TCP port: a whole number from 1 to 65535, so `listen` never throws on it. */
export const portEnv = ({ name, fallback }: { name: string; fallback: number }): number =>
	numberEnv({
		name,
		fallback,
		valid: (value) => Number.isInteger(value) && value >= 1 && value <= 65_535
	});
