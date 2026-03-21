import { getEntry } from 'astro:content';

export type Theme = 'modern' | 'faithful';

export async function getActiveTheme(): Promise<Theme> {
  const settings = await getEntry('settings', 'site');
  return settings?.data.activeTheme ?? 'modern';
}
