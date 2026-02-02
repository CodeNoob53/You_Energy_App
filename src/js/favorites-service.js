// Favorites Service - localStorage operations
// НЕ працює з DOM, тільки зберігає/читає дані

import { STORAGE_KEYS } from './constants.js';

// Get all favorites from localStorage
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
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

    if (favorites.some(fav => fav._id === exercise._id)) {
      return false;
    }

    favorites.push(exercise);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
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
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
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
