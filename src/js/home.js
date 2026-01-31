import {
  getFilters,
  getExercises,
  getExerciseById,
  updateRating,
} from './api.js';
import {
  renderCategories,
  renderExercises,
  renderSkeleton,
} from './dom.js';
import {
  renderPagination,
  setupPagination as setupPaginationListeners,
  scrollToTop,
} from './pagination.js';
import {
  openModal,
  closeModal,
  renderExerciseModal,
  showRatingModal,
  hideRatingModal,
  getCurrentRating,
} from './modal.js';
import { addFavorite, removeFavorite, isFavorite } from './favorites.js';
import { initQuote } from './quote.js';
import { toast } from './toast.js';

// Email validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// State object
const appState = {
  view: 'categories', // 'categories' or 'exercises'
  filter: 'Muscles',  // Active tab
  category: null,     // Selected category name
  categoryFilter: null, // The filter type of the selected category (e.g. 'Muscles')
  keyword: '',
  page: 1
};

// Get items limit based on screen width and view type
const getLimit = () => {
  const width = window.innerWidth;

  if (appState.view === 'categories') {
    // Categories: mobile 9, tablet/desktop 12
    return width < 768 ? 9 : 12;
  } else {
    // Exercises: mobile 8, tablet 10 (desktop has no pagination limit)
    return width < 768 ? 8 : 10;
  }
};

// Initialize home page
export async function initHomePage() {
  const mainContent = document.querySelector('.main-content');

  // Render initial skeletons immediately
  const initialLimit = getLimit();
  renderSkeleton(appState.view, 'exercises-container', initialLimit);

  try {
    // 1. Initialize Quote
    // Note: This is async and might fetch from API, so skeletal loading for exercises 
    // should already be visible by now.
    await initQuote();

    // 2. Initial Categories
    await fetchAndRender();

  } catch (err) {
    console.error('Error initializing home page:', err);
  } finally {
    if (mainContent) {
      mainContent.classList.add('loaded');
    }
  }

  // Setup event listeners
  setupFilterTabs();
  setupExerciseCards();
  setupPaginationListeners(handlePageChange);
  setupResizeListener();

  // Note: setupExerciseSearch is called dynamically when entering exercises view
}

// Setup window resize listener to update limit and re-fetch if needed
function setupResizeListener() {
  let timeoutId;
  let currentLimit = getLimit();

  window.addEventListener('resize', () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const newLimit = getLimit();
      if (newLimit !== currentLimit) {
        currentLimit = newLimit;
        appState.page = 1; // Reset to first page when limit changes to avoid empty pages
        fetchAndRender();
      }
    }, 300);
  });
}

// Fetch and render based on current state
async function fetchAndRender() {
  const container = document.getElementById('exercises-container');

  try {
    const limit = getLimit();
    renderSkeleton(appState.view, 'exercises-container', limit);

    if (appState.view === 'categories') {
      // Fetch Categories
      const filters = await getFilters({
        filter: appState.filter,
        page: appState.page,
        limit
      });
      renderCategories(filters.results, 'exercises-container');
      renderPagination(filters.page ? Number(filters.page) : 1, filters.totalPages || 1);
    } else {
      // Fetch Exercises
      const params = {
        limit,
        page: appState.page
      };

      if (appState.categoryFilter === 'Muscles') params.muscles = appState.category.toLowerCase();
      else if (appState.categoryFilter === 'Body parts') params.bodypart = appState.category.toLowerCase();
      else if (appState.categoryFilter === 'Equipment') params.equipment = appState.category.toLowerCase();

      if (appState.keyword) params.keyword = appState.keyword;

      const exercises = await getExercises(params);
      renderExercises(exercises.results, 'exercises-container');
      renderPagination(exercises.page ? Number(exercises.page) : 1, exercises.totalPages || 1);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    if (container) container.innerHTML = '<p class="error-message">Failed to load data. Please try again.</p>';
  }
}

// Handle page change from pagination
function handlePageChange(newPage) {
  if (newPage && newPage !== appState.page) {
    appState.page = newPage;
    fetchAndRender();
    scrollToTop();
  }
}

// Setup filter tabs
function setupFilterTabs() {
  const filterTabs = document.getElementById('filter-tabs');
  if (!filterTabs) return;

  // Check if already has listener to prevent duplicates
  if (filterTabs.dataset.listenerAttached === 'true') return;
  filterTabs.dataset.listenerAttached = 'true';

  filterTabs.addEventListener('click', async e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;

    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    // Update state
    appState.filter = btn.dataset.filter;
    appState.view = 'categories';
    appState.page = 1;
    appState.keyword = '';
    appState.category = null;

    hideExercisesHeader();

    try {
      await fetchAndRender();
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  });
}

// Setup exercise cards (and category clicks)
function setupExerciseCards() {
  const exercisesContainer = document.getElementById('exercises-container');
  if (!exercisesContainer) return;

  // Check if already has listener to prevent duplicates
  if (exercisesContainer.dataset.listenerAttached === 'true') return;
  exercisesContainer.dataset.listenerAttached = 'true';

  exercisesContainer.addEventListener('click', async e => {
    // Handle category card clicks
    const categoryCard = e.target.closest('.category-card');
    if (categoryCard) {
      e.preventDefault();
      const categoryName = categoryCard.dataset.name;
      const categoryFilter = categoryCard.dataset.filter;

      if (!categoryName) return;

      // Update state
      appState.view = 'exercises';
      appState.category = categoryName;
      appState.categoryFilter = categoryFilter; // Use the filter from the card!
      appState.page = 1;
      appState.keyword = '';

      showExercisesHeader(categoryName);
      setupExerciseSearch(); // Re-init search

      try {
        await fetchAndRender();
      } catch (err) {
        console.error('Failed to fetch exercises:', err);
      }
      return;
    }

    // Handle Start button clicks
    const startBtn = e.target.closest('.exercise-start-btn');
    if (startBtn) {
      const exerciseId = startBtn.dataset.id;
      if (!exerciseId) return;

      try {
        const exercise = await getExerciseById(exerciseId);
        renderExerciseModal(exercise);
        openModal('exercise-modal');
        setupExerciseModal(exerciseId);
      } catch (err) {
        console.error(`Failed to fetch exercise details for ${exerciseId}:`, err);
      }
    }
  });
}


// Show exercises header with breadcrumb
function showExercisesHeader(categoryName) {
  const sectionTitle = document.getElementById('section-title');
  const searchForm = document.getElementById('exercise-search-form');
  
  if (sectionTitle) {
    sectionTitle.innerHTML = `Exercises / <span class="category-name">${categoryName}</span>`;
  }
  
  if (searchForm) {
    searchForm.classList.remove('hidden');
  }
}

// Hide exercises header
function hideExercisesHeader() {
  const sectionTitle = document.getElementById('section-title');
  const searchForm = document.getElementById('exercise-search-form');
  const searchInput = document.getElementById('exercise-search-input');
  const clearBtn = document.getElementById('exercise-clear-btn');
  
  if (sectionTitle) {
    sectionTitle.textContent = 'Exercises';
  }
  
  if (searchForm) {
    searchForm.classList.add('hidden');
  }
  
  // Clear search input and hide clear button
  if (searchInput) {
    searchInput.value = '';
  }
  
  if (clearBtn) {
    clearBtn.classList.add('hidden');
  }
}

// Setup exercise search
function setupExerciseSearch() {
  const searchForm = document.getElementById('exercise-search-form');
  const searchInput = document.getElementById('exercise-search-input');
  const clearBtn = document.getElementById('exercise-clear-btn');

  if (!searchForm || !searchInput) return;

  // Check if already has listener to prevent duplicates
  if (searchForm.dataset.listenerAttached === 'true') return;
  searchForm.dataset.listenerAttached = 'true';

  // Show/hide clear button based on input
  searchInput.addEventListener('input', () => {
    if (searchInput.value.trim()) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  });

  // Clear button click
  clearBtn.addEventListener('click', async () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    searchInput.focus();

    // Update state and re-fetch
    appState.keyword = '';
    appState.page = 1;

    try {
      await fetchAndRender();
    } catch (err) {
      console.error('Failed to fetch exercises:', err);
    }
  });

  // Search form submit
  searchForm.addEventListener('submit', async e => {
    e.preventDefault();

    const keyword = searchInput.value.trim();

    // Update state and re-fetch
    appState.keyword = keyword;
    appState.page = 1;

    try {
      await fetchAndRender();
    } catch (err) {
      console.error('Failed to search exercises:', err);
    }
  });
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
      } else {
        const exercise = await getExerciseById(exerciseId);
        addFavorite(exercise);
      }
      updateFavoriteButton();
    };

    updateFavoriteButton();
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
