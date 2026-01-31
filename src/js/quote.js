import { getQuote } from './api.js';
import { renderQuote } from './dom.js';

const QUOTE_STORAGE_KEY = 'quote-of-the-day';

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Get cached quote from localStorage
 */
function getCachedQuote() {
  try {
    const cached = localStorage.getItem(QUOTE_STORAGE_KEY);
    if (!cached) return null;

    const { quote, author, date } = JSON.parse(cached);
    const today = getTodayDate();

    if (date === today) {
      return { quote, author };
    }

    localStorage.removeItem(QUOTE_STORAGE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading cached quote:', error);
    return null;
  }
}

/**
 * Save quote to localStorage
 */
function cacheQuote(quote, author) {
  try {
    const data = {
      quote,
      author,
      date: getTodayDate(),
    };
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error caching quote:', error);
  }
}

/**
 * Initialize Quote of the Day
 * Checks cache first, otherwise fetches from API
 */
export async function initQuote() {
  try {
    let quoteData = getCachedQuote();

    if (!quoteData) {
      quoteData = await getQuote();
      cacheQuote(quoteData.quote, quoteData.author);
    }

    renderQuote(quoteData);
  } catch (err) {
    console.error('Failed to initialize quote:', err);
  }
}
