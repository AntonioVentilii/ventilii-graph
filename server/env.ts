/** An environment variable, with unset and empty both read as absent. */
export const optionalEnv = (name: string): string | undefined => {
	const value = process.env[name];
	return value === undefined || value === '' ? undefined : value;
};

// A value the checks below refuse falls back to the default and is logged, so
// a mistyped setting runs on the reviewed default instead of on whatever the
// code would make of it. It does not stop the server: start.sh would take
// nginx and the whole site down with it.
const invalidEnv = <T>({ name, fallback }: { name: string; fallback: T }): T => {
	console.error(JSON.stringify({ event: 'config_invalid', name, fallback }));
	return fallback;
};

// A number from the environment, taken only when `valid` accepts it.
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
	return valid(value) ? value : invalidEnv({ name, fallback });
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

/** One word out of a fixed list, such as the model's effort. */
export const oneOfEnv = <T extends string>({
	name,
	values,
	fallback
}: {
	name: string;
	values: readonly T[];
	fallback: T;
}): T => {
	const raw = optionalEnv(name);
	if (raw === undefined) {
		return fallback;
	}
	return values.find((value) => value === raw) ?? invalidEnv({ name, fallback });
};
