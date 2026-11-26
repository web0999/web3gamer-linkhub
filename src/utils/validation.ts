/**
 * Validates whether a string is a valid HTTP/HTTPS URL.
 */
export function isValidHttpUrl(value: string | null | undefined): value is string {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates and formats a WhatsApp number or wa.me URL into a valid https://wa.me/... link.
 * Returns null if invalid or empty.
 */
export function formatWhatsAppUrl(value: string | null | undefined): string | null {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (isValidHttpUrl(trimmed)) {
    const url = new URL(trimmed);
    if (url.hostname === 'wa.me' || url.hostname === 'api.whatsapp.com') {
      return trimmed;
    }
    return null;
  }

  // Strip non-digit characters for raw phone numbers
  const digits = String(trimmed).replace(/\D/g, '');
  if (digits.length >= 7 && digits.length <= 15) {
    return `https://wa.me/${digits}`;
  }

  return null;
}

/**
 * Validates an email address and returns a mailto: link, or null if invalid.
 */
export function formatEmailUrl(value: string | null | undefined): string | null {
  if (!value || typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmed)) {
    return `mailto:${trimmed}`;
  }
  return null;
}

/**
 * Resolves a link destination (supports internal #anchors or valid http/https URLs).
 */
export function isValidDestination(value: string | null | undefined): value is string {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('#') && trimmed.length > 1) return true;
  return isValidHttpUrl(trimmed) || formatWhatsAppUrl(trimmed) !== null;
}
