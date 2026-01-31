import { loadTemplate, replacePlaceholders } from './dom.js';
import { initQuote } from './quote.js';
import { renderPagination, setupPagination } from './pagination.js';
import { openExerciseModal } from './exercise-controller.js';

const FAVORITES_KEY = 'favoriteExercises';

// Get all favorites from localStorage
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (err) {
    console.error('Failed to get favorites:', err);
    return [];
  }
}

// Add exercise to favorites
export function addFavorite(exercise) {
  try {
    const favorites = getFavorites();

    // Check if already exists
    if (favorites.some(fav => fav._id === exercise._id)) {
      return false;
    }

    favorites.push(exercise);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    return true;
  } catch (err) {
    console.error('Failed to add favorite:', err);
    return false;
  }
}

// Remove exercise from favorites
export function removeFavorite(exerciseId) {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => fav._id !== exerciseId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to remove favorite:', err);
    return false;
  }
}

// Check if exercise is in favorites
export function isFavorite(exerciseId) {
  const favorites = getFavorites();
  return favorites.some(fav => fav._id === exerciseId);
}

// Toggle favorite status
export function toggleFavorite(exercise) {
  if (isFavorite(exercise._id)) {
    return removeFavorite(exercise._id);
  } else {
    return addFavorite(exercise);
  }
}

// --- Favorites Page Logic ---

const favoritesState = {
  page: 1,
  perPage: 8,
};

// Get items per page based on screen width
function getPerPage() {
  const width = window.innerWidth;
  if (width >= 1440) return Infinity; // Desktop: no limit (scroll)
  if (width >= 768) return 10; // Tablet
  return 8; // Mobile
}

// Check if we should use pagination
function usePagination() {
  return window.innerWidth < 1440;
}

// Render empty state
async function renderEmptyState() {
  const container = document.getElementById('favorites-container');
  if (!container) return;

  const template = await loadTemplate('favorites-empty');
  container.innerHTML = template;
}

// Render favorites list
async function renderFavorites() {
  const container = document.getElementById('favorites-container');
  if (!container) return;

  const allFavorites = getFavorites();

  if (allFavorites.length === 0) {
    await renderEmptyState();
    renderPagination(1, 1, 'favorites-pagination');
    return;
  }

  const perPage = getPerPage();
  const shouldPaginate = usePagination();
  const totalPages = shouldPaginate ? Math.ceil(allFavorites.length / perPage) : 1;

  if (favoritesState.page > totalPages) {
    favoritesState.page = totalPages;
  }

  const startIndex = shouldPaginate ? (favoritesState.page - 1) * perPage : 0;
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
    renderPagination(favoritesState.page, totalPages, 'favorites-pagination');
  }
}

// Handle page change
function handlePageChange(newPage) {
  if (newPage && newPage !== favoritesState.page) {
    favoritesState.page = newPage;
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
        favoritesState.page = 1;
        renderFavorites();
      }
    }, 300);
  });
}

// Initialize favorites page
export async function initFavoritesPage() {
  const favoritesPage = document.querySelector('.favorites-page');

  try {
    await initQuote();
    await renderFavorites();
    setupFavoritesEventDelegation();
    setupPagination(handlePageChange, 'favorites-pagination');
    setupResizeListener();
  } catch (err) {
    console.error('Error initializing favorites page:', err);
  } finally {
    if (favoritesPage) favoritesPage.classList.add('loaded');
  }
}

// Setup event delegation for favorites container
function setupFavoritesEventDelegation() {
  const container = document.getElementById('favorites-container');
  if (!container) return;

  if (container.dataset.listenerAttached === 'true') return;
  container.dataset.listenerAttached = 'true';

  container.addEventListener('click', async (e) => {
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
