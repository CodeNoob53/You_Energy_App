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

// --- View / Initialization Logic (migrated from init-favorites.js) ---

import { getExerciseById, updateRating } from './api.js';
import { loadTemplate, replacePlaceholders } from './dom.js';
import {
  openModal,
  closeModal,
  renderExerciseModal,
  showRatingModal,
  hideRatingModal,
  getCurrentRating,
} from './modal.js';
import { initQuote } from './quote.js';
import { renderPagination, setupPagination } from './pagination.js';
import { toast } from './toast.js';

// Favorites page state
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
    // Hide pagination when empty
    renderPagination(1, 1, 'favorites-pagination');
    return;
  }

  // Calculate pagination
  const perPage = getPerPage();
  const shouldPaginate = usePagination();
  const totalPages = shouldPaginate ? Math.ceil(allFavorites.length / perPage) : 1;

  // Ensure current page is valid
  if (favoritesState.page > totalPages) {
    favoritesState.page = totalPages;
  }

  // Get items for current page
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

  // Render pagination (only visible on mobile/tablet via CSS)
  if (shouldPaginate) {
    renderPagination(favoritesState.page, totalPages, 'favorites-pagination');
  }
}

// Setup exercise modal
function setupExerciseModal(exerciseId) {
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => closeModal('exercise-modal');
  }

  const giveRatingBtn = document.getElementById('give-rating-btn');
  if (giveRatingBtn) {
    giveRatingBtn.onclick = () => {
      showRatingModal();
      setupRatingModal(exerciseId);
    };
  }

  const addToFavoritesBtn = document.getElementById('add-to-favorites-btn');
  if (addToFavoritesBtn) {
    // On favorites page, items are always in favorites
    addToFavoritesBtn.innerHTML = `
      <span class="btn-text">Remove from favorites</span>
      <svg width="20" height="20" aria-hidden="true">
        <use href="#icon-trash"></use>
      </svg>
    `;

    addToFavoritesBtn.onclick = async () => {
      removeFavorite(exerciseId);
      closeModal('exercise-modal');
      await renderFavorites();
    };
  }
}

// Setup rating modal
function setupRatingModal(exerciseId) {
  const closeBtn = document.getElementById('rating-modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => hideRatingModal();
  }

  const ratingForm = document.getElementById('rating-form');
  if (ratingForm) {
    ratingForm.onsubmit = async e => {
      e.preventDefault();

      // Native validation handles required fields
      if (!ratingForm.checkValidity()) {
        ratingForm.reportValidity();
        return;
      }

      const rating = getCurrentRating();
      const email = ratingForm.email.value.trim();
      const review = ratingForm.review?.value.trim() || '';

      try {
        await updateRating(exerciseId, rating, email, review);
        hideRatingModal();
        toast.success('Rating submitted successfully!');
      } catch (err) {
        console.error('Failed to submit rating:', err);
      }
    };
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
    // Initialize Quote
    await initQuote();

    await renderFavorites();

    // Setup event delegation for favorites
    setupFavoritesEventDelegation();

    // Setup pagination
    setupPagination(handlePageChange, 'favorites-pagination');

    // Setup resize listener
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

  // Check if already has listener to prevent duplicates
  if (container.dataset.listenerAttached === 'true') return;
  container.dataset.listenerAttached = 'true';

  container.addEventListener('click', async (e) => {
    // Handle delete button clicks
    const deleteBtn = e.target.closest('.favorite-delete-btn');
    if (deleteBtn) {
      e.stopPropagation();
      const exerciseId = deleteBtn.dataset.id;
      if (exerciseId) {
        removeFavorite(exerciseId);
        try {
          await renderFavorites();
        } catch (err) {
          console.error('Failed to render favorites:', err);
        }
      }
      return;
    }

    // Handle start button clicks
    const startBtn = e.target.closest('.exercise-start-btn');
    if (startBtn) {
      e.stopPropagation();
      const exerciseId = startBtn.dataset.id;
      if (!exerciseId) return;

      try {
        const exercise = await getExerciseById(exerciseId);
        renderExerciseModal(exercise);
        openModal('exercise-modal');
        setupExerciseModal(exerciseId);
      } catch (err) {
        console.error('Failed to fetch exercise details:', err);
      }
    }
  });
}
