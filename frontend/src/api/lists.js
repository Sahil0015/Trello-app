/**
 * lists.js - List API Functions
 * 
 * Contains all API calls related to lists:
 * - Creating, updating, deleting lists
 * - Reordering lists
 */

import api from './axios';

/**
 * Create a new list in a board
 * @param {string} title - List title
 * @param {number} boardId - The board ID
 * @param {number} position - List position (order)
 */
export const createList = (title, boardId, position = 0) => 
  api.post('/lists/', { title, board_id: boardId, position });

/**
 * Update a list (title or position)
 * @param {number} listId - The list ID
 * @param {object} data - Fields to update
 */
export const updateList = (listId, data) => 
  api.patch(`/lists/${listId}`, data);

/**
 * Delete a list
 * @param {number} listId - The list ID to delete
 */
export const deleteList = (listId) => 
  api.delete(`/lists/${listId}`);

/**
 * Move/reorder a list
 * @param {number} listId - The list ID
 * @param {number} position - New position
 */
export const moveList = (listId, position) => 
  api.patch(`/lists/${listId}`, { position });
