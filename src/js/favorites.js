// Favorites Page
// Сторінка — "диригент", збирає все разом

import { loadTemplate, replacePlaceholders } from './dom.js';
import { initQuote } from './quote.js';
import { renderPagination, setupPagination } from './pagination.js';
import { openExerciseModal } from './exercise-controller.js';
import { getFavorites, removeFavorite } from './favorites-service.js';

// Re-export service functions for other modules
export { getFavorites, addFavorite, removeFavorite, isFavorite, toggleFavorite } from './favorites-service.js';

// Page state
const state = {
  page: 1,
};

// Get items per page based on screen width
function getPerPage() {
  const width = window.innerWidth;
  if (width >= 1440) return Infinity;
  if (width >= 768) return 10;
  return 8;
}

// Check if we should use pagination
function usePagination() {
  return window.innerWidth < 1440;
}

// Render empty state
async function renderEmptyState(container) {
  const template = await loadTemplate('favorites-empty');
  container.innerHTML = template;
}

// Render favorites list
async function renderFavorites() {
  const container = document.getElementById('favorites-container');
  if (!container) return;

  const allFavorites = getFavorites();

  if (allFavorites.length === 0) {
    await renderEmptyState(container);
    renderPagination(1, 1, 'favorites-pagination');
    return;
  }

  const perPage = getPerPage();
  const shouldPaginate = usePagination();
  const totalPages = shouldPaginate ? Math.ceil(allFavorites.length / perPage) : 1;

  if (state.page > totalPages) {
    state.page = totalPages;
  }

  const startIndex = shouldPaginate ? (state.page - 1) * perPage : 0;
  const endIndex = shouldPaginate ? startIndex + perPage : allFavorites.length;
  const favorites = allFavorites.slice(startIndex, endIndex);

  const cardTemplate = await loadTemplate('exercise-card');

  const cardsHtml = favorites
    .map(exercise => {
      return replacePlaceholders(cardTemplate, {
        id: exercise._id,
        name: exercise.name,
        burnedCalories: exercise.burnedCalories || 0,
        time: exercise.time || 0,
        bodyPart: exercise.bodyPart || 'N/A',
        target: exercise.target || 'N/A',
        rating: exercise.rating || 0,
        ratingFormatted: exercise.rating ? exercise.rating.toFixed(1) : '0.0',
        cardClass: 'is-favorite',
      });
    })
    .join('');

  container.className = 'favorites-grid';
  container.innerHTML = cardsHtml;

  if (shouldPaginate) {
    renderPagination(state.page, totalPages, 'favorites-pagination');
  }
}

// Handle page change
function handlePageChange(newPage) {
  if (newPage && newPage !== state.page) {
    state.page = newPage;
    renderFavorites();
  }
}

// Setup resize listener
function setupResizeListener() {
  let timeoutId;
  let currentPerPage = getPerPage();

  window.addEventListener('resize', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const newPerPage = getPerPage();
      if (newPerPage !== currentPerPage) {
        currentPerPage = newPerPage;
        state.page = 1;
        renderFavorites();
      }
    }, 300);
  });
}

// Setup event delegation for favorites container
function setupEventHandlers() {
  const container = document.getElementById('favorites-container');
  if (!container) return;

  if (container.dataset.listenerAttached === 'true') return;
  container.dataset.listenerAttached = 'true';

  container.addEventListener('click', async (e) => {
    // Delete button
    const deleteBtn = e.target.closest('.favorite-delete-btn');
    if (deleteBtn) {
      e.stopPropagation();
      const exerciseId = deleteBtn.dataset.id;
      if (exerciseId) {
        removeFavorite(exerciseId);
        await renderFavorites();
      }
      return;
    }

    // Start button
    const startBtn = e.target.closest('.exercise-start-btn');
    if (startBtn) {
      e.stopPropagation();
      const exerciseId = startBtn.dataset.id;
      if (!exerciseId) return;

      await openExerciseModal(exerciseId, {
        isFavoritesPage: true,
        onRemoveFavorite: () => renderFavorites(),
      });
    }
  });
}

// Initialize favorites page
export async function initFavoritesPage() {
  const favoritesPage = document.querySelector('.favorites-page');

  try {
    await initQuote();
    await renderFavorites();
    setupEventHandlers();
    setupPagination(handlePageChange, 'favorites-pagination');
    setupResizeListener();
  } catch (err) {
    console.error('Error initializing favorites page:', err);
  } finally {
    if (favoritesPage) favoritesPage.classList.add('loaded');
  }
}
