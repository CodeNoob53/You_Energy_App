// Import templates as raw strings
import exerciseCardTemplate from '../partials/exercise-card.html?raw';
import categoryCardTemplate from '../partials/category-card.html?raw';
import favoritesEmptyTemplate from '../partials/favorites-empty.html?raw';
import paginationTemplate from '../partials/pagination.html?raw';

// Map of template names to raw HTML
const templates = {
  'exercise-card': exerciseCardTemplate,
  'category-card': categoryCardTemplate,
  'favorites-empty': favoritesEmptyTemplate,
  'pagination': paginationTemplate,
};

// Cache for loaded templates (kept for backward compatibility, though not strictly needed with imports)
const templateCache = { ...templates };

/**
 * Load template from bundled imports
 * @param {string} templateName
 * @returns {Promise<string>}
 */
export const loadTemplate = async templateName => {
  if (templateCache[templateName]) {
    return templateCache[templateName];
  }

  console.warn(`Template not found in bundle: ${templateName}`);
  return '';
};

/**
 * Replace placeholders in template with data
 * @param {string} template
 * @param {object} data
 * @returns {string}
 */
export const replacePlaceholders = (template, data) => {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => {
    return data[key] !== undefined ? data[key] : '';
  });
};

export const renderQuote = quoteData => {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  if (quoteText && quoteData.quote) {
    quoteText.textContent = quoteData.quote;
  }
  if (quoteAuthor && quoteData.author) {
    quoteAuthor.textContent = quoteData.author;
  }
};

export const renderExercises = async (exercises, containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (exercises.length === 0) {
    container.innerHTML = '<p class="no-results">No exercises found. Try another filter.</p>';
    return;
  }

  const template = await loadTemplate('exercise-card');

  const exercisesHtml = exercises
    .map(exercise => {
      return replacePlaceholders(template, {
        id: exercise._id,
        rating: exercise.rating || 0,
        ratingFormatted: exercise.rating ? exercise.rating.toFixed(1) : '0.0',
        cardClass: '',
        name: exercise.name,
        burnedCalories: exercise.burnedCalories || 0,
        time: exercise.time || 0,
        bodyPart: exercise.bodyPart || 'N/A',
        target: exercise.target || 'N/A',
      });
    })
    .join('');

  container.className = 'exercises-grid';
  container.innerHTML = exercisesHtml;
};

export const renderCategories = async (categories, containerId) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (categories.length === 0) {
    container.innerHTML = '<p class="no-results">No categories found.</p>';
    return;
  }

  const template = await loadTemplate('category-card');

  const categoriesHtml = categories
    .map(cat => {
      return replacePlaceholders(template, {
        filter: cat.filter,
        name: cat.name,
        imgURL: cat.imgURL || '',
      });
    })
    .join('');

  container.className = 'categories-grid';
  container.innerHTML = categoriesHtml;
};

/**
 * Render skeleton loaders
 * @param {string} view - 'categories' or 'exercises'
 * @param {string} containerId - ID of container element
 * @param {number} count - Number of skeleton items to render
 */
export const renderSkeleton = (view, containerId, count = 9) => {
  const container = document.getElementById(containerId);
  if (!container) return;

  let skeletonHtml = '';

  if (view === 'categories') {
    skeletonHtml = Array(count)
      .fill('<li class="category-skeleton skeleton-shimmer"></li>')
      .join('');
    container.className = 'categories-grid';
    container.innerHTML = skeletonHtml;
  } else {
    const item = `
      <li class="exercise-skeleton">
        <div class="shimmer-header">
           <div class="shimmer-badge skeleton-shimmer"></div>
           <div class="shimmer-badge skeleton-shimmer"></div>
        </div>
        <div class="shimmer-title skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
        <div class="shimmer-line skeleton-shimmer"></div>
      </li>
    `;
    skeletonHtml = Array(count).fill(item).join('');
    container.className = 'exercises-grid';
    container.innerHTML = skeletonHtml;
  }
};
