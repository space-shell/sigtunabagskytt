/**
 * Keystatic CMS API route — handles all /api/keystatic/* requests.
 * Runs as a Cloudflare Worker.
 */
export const prerender = false;

import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const ALL = makeHandler({ config });
