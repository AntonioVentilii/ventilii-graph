import Anthropic from '@anthropic-ai/sdk';
import { oidcFederationProvider } from '@anthropic-ai/sdk/lib/credentials/oidc-federation';
import type { BetaOutputConfig } from '@anthropic-ai/sdk/resources/beta/messages/messages';
import type { AiHealth } from '../src/lib/types/ai.types.ts';
import { oneOfEnv, optionalEnv } from './env.ts';
import { mintFlyIdentityToken } from './fly-oidc.ts';

/**
 * The Claude API client: which model runs, at which effort, and how the
 * server authenticates. index.ts turns requests into calls on it.
 */

export const MODEL = process.env.AI_MODEL ?? 'claude-opus-5';
// The efforts AI_EFFORT may pick, out of the API's own list: the three the
// server has always allowed. Adding xhigh or max is the owner's call.
const EFFORTS = ['low', 'medium', 'high'] as const satisfies readonly NonNullable<
	BetaOutputConfig['effort']
>[];
export const EFFORT = oneOfEnv({ name: 'AI_EFFORT', values: EFFORTS, fallback: 'medium' });

// Credentials: ANTHROPIC_API_KEY locally (it always wins), and on Fly workload
// identity federation, as the other Fly apps use: the machine's OIDC token is
// exchanged for a Claude access token, which the SDK renews before it expires.
// The four ids are public identifiers, not secrets.
const federation = {
	federationRuleId: optionalEnv('ANTHROPIC_FEDERATION_RULE_ID') ?? '',
	organizationId: optionalEnv('ANTHROPIC_ORGANIZATION_ID') ?? '',
	serviceAccountId: optionalEnv('ANTHROPIC_SERVICE_ACCOUNT_ID'),
	workspaceId: optionalEnv('ANTHROPIC_WORKSPACE_ID')
};
export const auth: AiHealth['auth'] = process.env.ANTHROPIC_API_KEY
	? 'api_key'
	: federation.federationRuleId && federation.organizationId
		? 'federation'
		: 'off';
export const configured = auth !== 'off';
// No SDK retries: a retried attempt is billed twice and its usage arrives
// once, so the budget would undercount; the page tells the visitor to retry.
const clientOptions = { timeout: 110_000, maxRetries: 0 };
export const client =
	auth === 'api_key'
		? new Anthropic(clientOptions)
		: auth === 'federation'
			? new Anthropic({
					...clientOptions,
					credentials: oidcFederationProvider({
						...federation,
						identityTokenProvider: mintFlyIdentityToken,
						baseURL: process.env.ANTHROPIC_BASE_URL ?? 'https://api.anthropic.com',
						fetch
					})
				})
			: undefined;
