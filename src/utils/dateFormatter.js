/**
 * Format date object to readable string
 * @param {Object} dateObj - Date object {month, day, year}
 * @returns {string} - Formatted date string
 */
export const formatDate = dateObj => {
  if (!dateObj || !dateObj.month || !dateObj.day || !dateObj.year) {
    return 'Date unavailable';
  }

  return `${dateObj.day} ${dateObj.month} ${dateObj.year}`;
};

/**
 * Format date to DD/MM/YYYY
 * @param {Date} date - JavaScript Date object
 * @returns {string} - Formatted date string
 */
export const formatDateShort = date => {
  if (!date) return '';

  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Parse property date object to JavaScript Date
 * @param {Object} added - Added object {month, day, year}
 * @returns {Date} - JavaScript Date object
 */
export const parsePropertyDate = added => {
  const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  return new Date(added.year, monthMap[added.month], added.day);
};

/**
 * Get month name from number
 * @param {number} monthNum - Month number (0-11)
 * @returns {string} - Month name
 */
export const getMonthName = monthNum => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[monthNum] || '';
};

/**
 * Check if date is within range
 * @param {Date} date - Date to check
 * @param {Date} startDate - Range start
 * @param {Date} endDate - Range end
 * @returns {boolean} - Is within range
 */
export const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);

  return d >= start && d <= end;
};
