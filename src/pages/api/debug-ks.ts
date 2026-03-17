export const prerender = false;

import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const env = (context.locals as any).runtime?.env ?? {};
  return new Response(
    JSON.stringify({
      clientId_set: !!env.KEYSTATIC_GITHUB_CLIENT_ID,
      clientId_len: (env.KEYSTATIC_GITHUB_CLIENT_ID ?? '').length,
      clientSecret_set: !!env.KEYSTATIC_GITHUB_CLIENT_SECRET,
      clientSecret_len: (env.KEYSTATIC_GITHUB_CLIENT_SECRET ?? '').length,
      secret_set: !!env.KEYSTATIC_SECRET,
      secret_len: (env.KEYSTATIC_SECRET ?? '').length,
      runtime_exists: !!(context.locals as any).runtime,
    }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}
