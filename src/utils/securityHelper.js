/**
 * Security utilities for CSP and XSS prevention
 */

/**
 * Sanitize HTML string to prevent XSS
 * Note: React already escapes content by default via JSX
 * This is for extra demonstration purposes
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeHTML = str => {
  if (!str) return '';

  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};

/**
 * Escape special characters in user input
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
export const escapeHTML = str => {
  if (!str) return '';

  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * Validate postcode format (UK)
 * @param {string} postcode - Postcode to validate
 * @returns {boolean} - Is valid
 */
export const validatePostcode = postcode => {
  if (!postcode) return true; // Empty is valid (optional field)

  // UK postcode format: 2-4 characters followed by space and 3 characters
  // For search, we only use first part, so validate that
  const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?$/i;
  return postcodeRegex.test(postcode.trim());
};

/**
 * Validate number input
 * @param {string} value - Value to validate
 * @returns {boolean} - Is valid number
 */
export const validateNumber = value => {
  if (!value) return true; // Empty is valid
  return !isNaN(value) && Number(value) >= 0;
};

/**
 * Strip potentially dangerous characters from search input
 * @param {string} input - User input
 * @returns {string} - Cleaned input
 */
export const sanitizeSearchInput = input => {
  if (!input) return '';

  // Remove HTML tags, script tags, and special characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/[<>'"]/g, '')
    .trim();
};

/**
 * Content Security Policy meta tag content
 * Add this to your HTML head
 */
export const CSP_CONTENT = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://maps.googleapis.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://maps.googleapis.com;
  frame-src https://www.google.com;
`.replace(/\s+/g, ' ').trim();

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const validateEmail = email => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Rate limiting for search/filter operations
 */
export class RateLimiter {
  constructor(maxCalls = 10, timeWindow = 1000) {
    this.maxCalls = maxCalls;
    this.timeWindow = timeWindow;
    this.calls = [];
  }

  canMakeCall() {
    const now = Date.now();
    this.calls = this.calls.filter(time => now - time < this.timeWindow);

    if (this.calls.length < this.maxCalls) {
      this.calls.push(now);
      return true;
    }

    return false;
  }
}
