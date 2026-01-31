import { getExerciseById, updateRating } from './api.js';
import {
  openModal,
  closeModal,
  renderExerciseModal,
  showRatingModal,
  hideRatingModal,
  getCurrentRating,
} from './modal.js';
import { addFavorite, removeFavorite, isFavorite } from './favorites.js';
import { toast } from './toast.js';

// Setup exercise modal with optional callbacks
export function setupExerciseModal(exerciseId, options = {}) {
  const { onRemoveFavorite, isFavoritesPage = false } = options;

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
    const updateFavoriteButton = () => {
      if (isFavorite(exerciseId)) {
        addToFavoritesBtn.innerHTML = `
          <span class="btn-text">Remove from favorites</span>
          <svg width="20" height="20" aria-hidden="true">
            <use href="#icon-trash"></use>
          </svg>
        `;
      } else {
        addToFavoritesBtn.innerHTML = `
          <span class="btn-text">Add to favorites</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 3.5C10 3.5 6.5 1 3.5 3.5C0.5 6 2 10 10 16.5C18 10 19.5 6 16.5 3.5C13.5 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        `;
      }
    };

    addToFavoritesBtn.onclick = async () => {
      if (isFavorite(exerciseId)) {
        removeFavorite(exerciseId);
        if (isFavoritesPage) {
          closeModal('exercise-modal');
          if (onRemoveFavorite) onRemoveFavorite();
        } else {
          updateFavoriteButton();
        }
      } else {
        const exercise = await getExerciseById(exerciseId);
        addFavorite(exercise);
        updateFavoriteButton();
      }
    };

    updateFavoriteButton();
  }
}

// Setup rating modal
export function setupRatingModal(exerciseId) {
  const closeBtn = document.getElementById('rating-modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => hideRatingModal();
  }

  const ratingForm = document.getElementById('rating-form');
  if (ratingForm) {
    ratingForm.onsubmit = async e => {
      e.preventDefault();

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

// Open exercise modal with skeleton and fetch
export async function openExerciseModal(exerciseId, options = {}) {
  openModal('exercise-modal');

  // Render skeleton immediately
  const { renderExerciseSkeleton } = await import('./dom.js');
  renderExerciseSkeleton();

  try {
    const exercise = await getExerciseById(exerciseId);
    renderExerciseModal(exercise);
    setupExerciseModal(exerciseId, options);
  } catch (err) {
    console.error(`Failed to fetch exercise details for ${exerciseId}:`, err);
    closeModal('exercise-modal');
  }
}

// Create debounced resize listener
export function createResizeListener(getLimit, onLimitChange) {
  let timeoutId;
  let currentLimit = getLimit();

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const newLimit = getLimit();
      if (newLimit !== currentLimit) {
        currentLimit = newLimit;
        onLimitChange();
      }
    }, 300);
  };
}
