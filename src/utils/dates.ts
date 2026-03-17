/**
 * Swedish locale date formatting utilities.
 */

const SV_LOCALE = 'sv-SE';

/**
 * Format a date in Swedish long format: "17 mars 2026"
 */
export function formatDateLong(date: Date): string {
  return new Intl.DateTimeFormat(SV_LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Format a date in Swedish short format: "17 mar 2026"
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat(SV_LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Format a date for <time> datetime attribute: "2026-03-17"
 */
export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Returns true if the event date is in the past.
 */
export function isPastEvent(date: Date): boolean {
  return date < new Date();
}

/**
 * Returns the Swedish day name for a day-of-week string.
 */
export function formatDayOfWeek(day: string): string {
  // Capitalize first letter
  return day.charAt(0).toUpperCase() + day.slice(1);
}
