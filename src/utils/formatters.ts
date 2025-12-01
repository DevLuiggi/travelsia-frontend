import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Format ISO date string to readable format
 * @example formatDate('2025-12-15') => '15 de diciembre de 2025'
 */
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "d 'de' MMMM 'de' yyyy", { locale: es });
  } catch {
    return dateString;
  }
}

/**
 * Format ISO date string to short format
 * @example formatDateShort('2025-12-15') => '15 dic 2025'
 */
export function formatDateShort(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'd MMM yyyy', { locale: es });
  } catch {
    return dateString;
  }
}

/**
 * Format ISO datetime to time only
 * @example formatTime('2025-12-15T10:30:00') => '10:30'
 */
export function formatTime(dateTimeString: string): string {
  try {
    const date = parseISO(dateTimeString);
    return format(date, 'HH:mm');
  } catch {
    return dateTimeString;
  }
}

/**
 * Format ISO datetime to date and time
 * @example formatDateTime('2025-12-15T10:30:00') => '15 dic 2025, 10:30'
 */
export function formatDateTime(dateTimeString: string): string {
  try {
    const date = parseISO(dateTimeString);
    return format(date, "d MMM yyyy, HH:mm", { locale: es });
  } catch {
    return dateTimeString;
  }
}

/**
 * Format ISO 8601 duration to readable format
 * @example formatDuration('PT2H30M') => '2h 30m'
 */
export function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return isoDuration;

  const hours = match[1] ? `${match[1]}h` : '';
  const minutes = match[2] ? `${match[2]}m` : '';

  return `${hours} ${minutes}`.trim() || '0m';
}

/**
 * Format price with currency
 * @example formatPrice('185.00', 'EUR') => '€185.00'
 */
export function formatPrice(amount: string, currency: string): string {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
  };
  return `${symbols[currency] || currency} ${amount}`;
}

/**
 * Get time of day icon
 */
export function getTimeIcon(time: string): string {
  switch (time) {
    case 'Morning':
      return '🌅';
    case 'Afternoon':
      return '🌞';
    case 'Evening':
      return '🌙';
    default:
      return '⏰';
  }
}

/**
 * Format time of day in Spanish
 */
export function formatTimeOfDay(time: string): string {
  switch (time) {
    case 'Morning':
      return 'Mañana';
    case 'Afternoon':
      return 'Tarde';
    case 'Evening':
      return 'Noche';
    default:
      return time;
  }
}

/**
 * Get number of stops text
 */
export function formatStops(numStops: number): string {
  if (numStops === 0) return 'Directo';
  if (numStops === 1) return '1 escala';
  return `${numStops} escalas`;
}
