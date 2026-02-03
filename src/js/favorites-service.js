// Favorites Service - localStorage operations
// Зберігає тільки ID вправ, дані завантажуються з API

import { STORAGE_KEYS } from './constants.js';

// Get all favorite IDs from localStorage
export function getFavoriteIds() {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  } catch (err) {
    console.error('Failed to get favorites:', err);
    return [];
  }
}

// Add exercise ID to favorites
export function addFavorite(exerciseId) {
  try {
    const favorites = getFavoriteIds();

    if (favorites.includes(exerciseId)) {
      return false;
    }

    favorites.push(exerciseId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return true;
  } catch (err) {
    console.error('Failed to add favorite:', err);
    return false;
  }
}

// Remove exercise ID from favorites
export function removeFavorite(exerciseId) {
  try {
    const favorites = getFavoriteIds();
    const filtered = favorites.filter(id => id !== exerciseId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
    return true;
  } catch (err) {
    console.error('Failed to remove favorite:', err);
    return false;
  }
}

// Check if exercise is in favorites
export function isFavorite(exerciseId) {
  const favorites = getFavoriteIds();
  return favorites.includes(exerciseId);
}

// Toggle favorite status
export function toggleFavorite(exerciseId) {
  if (isFavorite(exerciseId)) {
    return removeFavorite(exerciseId);
  } else {
    return addFavorite(exerciseId);
  }
}
