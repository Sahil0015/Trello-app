/**
 * boards.js - Board API Functions
 * 
 * Contains all API calls related to boards:
 * - Fetching a board with its lists and cards
 * - Search/filter functionality
 */

import api from './axios';

/**
 * Fetch all boards
 */
export const getBoards = () => api.get('/boards/');

/**
 * Fetch a single board by ID with all lists and cards
 * @param {number} boardId - The board ID to fetch
 */
export const getBoard = (boardId) => api.get(`/boards/${boardId}`);

/**
 * Create a new board
 * @param {string} title - Board title
 */
export const createBoard = (title) => api.post('/boards/', { title });

/**
 * Delete a board
 * @param {number} boardId - Board ID to delete
 */
export const deleteBoard = (boardId) => api.delete(`/boards/${boardId}`);

/**
 * Search and filter cards
 * @param {object} filters - Filter options (q, label_id, member_id)
 */
export const searchCards = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.q) params.append('q', filters.q);
  if (filters.label_id) params.append('label_id', filters.label_id);
  if (filters.member_id) params.append('member_id', filters.member_id);
  
  const queryString = params.toString();
  const url = `/search/cards${queryString ? '?' + queryString : ''}`;
  
  return api.get(url);
};
