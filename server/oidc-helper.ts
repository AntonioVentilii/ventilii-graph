import { chmodSync, chownSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { createServer, request } from 'node:http';

/**
 * The only privileged piece of the image. Fly's machine agent socket
 * (/.fly/api) belongs to root and exposes the whole Machines API, so the
 * internet-facing API must not reach it. This helper runs as root, answers a
 * single question on its own socket (a fresh OIDC token for Anthropic's
 * audience) and nothing else, and that socket is open only to the API's
 * group, not to nginx. See docker/start.sh.
 */

const FLY_API_SOCKET = '/.fly/api';
const HELPER_DIR = '/run/oidc';
const HELPER_SOCKET = `${HELPER_DIR}/oidc.sock`;
const AUDIENCE = 'https://api.anthropic.com';
const API_GROUP = 'api';

const mint = (): Promise<{ status: number; body: string }> =>
	new Promise((resolve, reject) => {
		const req = request(
			{
				socketPath: FLY_API_SOCKET,
				path: '/v1/tokens/oidc',
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				timeout: 10_000
			},
			(res) => {
				const chunks: Buffer[] = [];
				res.on('data', (chunk: Buffer) => chunks.push(chunk));
				res.on('end', () =>
					resolve({ status: res.statusCode ?? 502, body: Buffer.concat(chunks).toString('utf8') })
				);
			}
		);
		req.on('timeout', () => req.destroy(new Error('timed out')));
		req.on('error', reject);
		req.end(JSON.stringify({ aud: AUDIENCE }));
	});

// The Dockerfile creates the `api` group; its id is read rather than assumed.
const groupId = (): number => {
	const line = readFileSync('/etc/group', 'utf8')
		.split('\n')
		.find((l) => l.startsWith(`${API_GROUP}:`));
	const gid = Number(line?.split(':')[2]);
	if (!Number.isInteger(gid)) {
		throw new Error(`oidc-helper: no ${API_GROUP} group`);
	}
	return gid;
};

// eslint-disable-next-line local-rules/prefer-object-params -- node:http's handler signature
const server = createServer((req, res) => {
	if (req.method !== 'POST' || req.url !== '/token') {
		res.writeHead(404).end();
		return;
	}
	mint()
		.then(({ status, body }) => {
			res.writeHead(status, { 'content-type': 'text/plain' }).end(body);
		})
		.catch((err: unknown) => {
			console.error(
				JSON.stringify({
					event: 'oidc_mint_failed',
					message: err instanceof Error ? err.message : String(err)
				})
			);
			res.writeHead(502).end();
		});
});

// The directory, not just the socket, is closed to everyone but root and the
// API group, so there is no window in which another user can connect.
const gid = groupId();
mkdirSync(HELPER_DIR, { recursive: true });
chownSync(HELPER_DIR, 0, gid);
chmodSync(HELPER_DIR, 0o750);
rmSync(HELPER_SOCKET, { force: true });
server.listen(HELPER_SOCKET, () => {
	chownSync(HELPER_SOCKET, 0, gid);
	chmodSync(HELPER_SOCKET, 0o660);
	console.log(JSON.stringify({ event: 'oidc_helper_listening', socket: HELPER_SOCKET }));
});

const shutdown = () => server.close(() => process.exit(0));
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
