import { request } from 'node:http';

/**
 * Fly.io workload identity, so production holds no Anthropic API key. Every
 * Fly Machine can mint a short-lived OIDC JWT (sub = "<org>:<app>:<machine>",
 * iss = https://oidc.fly.io/<org>), and Anthropic's Workload Identity
 * Federation exchanges it for a Claude access token. Each mint is a fresh JWT
 * with its own jti: Anthropic accepts an assertion once, and the SDK asks for
 * a new one before every exchange.
 *
 * The API never touches Fly's machine socket (it is the whole Machines API).
 * It asks server/oidc-helper.ts, a root process that only mints tokens for
 * Anthropic's audience, over a socket open to the API's group alone.
 */

const HELPER_SOCKET = '/run/oidc/oidc.sock';

/** The agent answers with the compact JWT, sometimes JSON-quoted. */
const parseToken = (body: string): string => {
	const trimmed = body.trim();
	const token = trimmed.startsWith('"') ? (JSON.parse(trimmed) as unknown) : trimmed;
	if (typeof token !== 'string' || token.split('.').length !== 3) {
		throw new Error('fly oidc: response is not a JWT');
	}
	return token;
};

export const mintFlyIdentityToken = (): Promise<string> =>
	new Promise((resolve, reject) => {
		const req = request(
			{ socketPath: HELPER_SOCKET, path: '/token', method: 'POST', timeout: 15_000 },
			(res) => {
				const chunks: Buffer[] = [];
				res.on('data', (chunk: Buffer) => chunks.push(chunk));
				res.on('end', () => {
					if (res.statusCode !== 200) {
						reject(new Error(`fly oidc: token request failed (${res.statusCode})`));
						return;
					}
					try {
						resolve(parseToken(Buffer.concat(chunks).toString('utf8')));
					} catch (err: unknown) {
						reject(err instanceof Error ? err : new Error('fly oidc: bad response'));
					}
				});
			}
		);
		req.on('timeout', () => req.destroy(new Error('fly oidc: timed out')));
		req.on('error', reject);
		req.end();
	});
