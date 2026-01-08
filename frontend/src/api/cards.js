/**
 * cards.js - Card API Functions
 * 
 * Contains all API calls related to cards:
 * - CRUD operations
 * - Moving cards (drag & drop)
 * - Labels, members, checklist management
 */

import api from './axios';

// ===== BASIC CARD OPERATIONS =====

/**
 * Create a new card in a list
 * @param {string} title - Card title
 * @param {number} listId - The list ID
 * @param {number} position - Card position
 */
export const createCard = (title, listId, position = 0) => 
  api.post('/cards/', { title, list_id: listId, position });

/**
 * Get a single card by ID
 */
export const getCard = (cardId) => 
  api.get(`/cards/${cardId}`);

/**
 * Update a card (title, description, due_date, etc.)
 * @param {number} cardId - The card ID
 * @param {object} data - Fields to update
 */
export const updateCard = (cardId, data) => 
  api.patch(`/cards/${cardId}`, data);

/**
 * Delete a card
 */
export const deleteCard = (cardId) => 
  api.delete(`/cards/${cardId}`);

/**
 * Move a card to a different list and/or position
 * This is the core function for drag & drop
 * @param {number} cardId - The card ID
 * @param {number} listId - Target list ID
 * @param {number} position - New position in target list
 */
export const moveCard = (cardId, listId, position) => 
  api.patch(`/cards/${cardId}/move`, { list_id: listId, position });

// ===== LABEL OPERATIONS =====

/**
 * Add a label to a card
 */
export const addLabelToCard = (cardId, labelId) => 
  api.post(`/cards/${cardId}/labels/${labelId}`);

/**
 * Remove a label from a card
 */
export const removeLabelFromCard = (cardId, labelId) => 
  api.delete(`/cards/${cardId}/labels/${labelId}`);

// ===== MEMBER OPERATIONS =====

/**
 * Add a member to a card
 */
export const addMemberToCard = (cardId, memberId) => 
  api.post(`/cards/${cardId}/members/${memberId}`);

/**
 * Remove a member from a card
 */
export const removeMemberFromCard = (cardId, memberId) => 
  api.delete(`/cards/${cardId}/members/${memberId}`);

// ===== CHECKLIST OPERATIONS =====

/**
 * Add a checklist item to a card
 */
export const addChecklistItem = (cardId, text) => 
  api.post(`/cards/${cardId}/checklist`, { text });

/**
 * Toggle a checklist item's completion
 */
export const toggleChecklistItem = (itemId) => 
  api.patch(`/cards/checklist/${itemId}/toggle`);

/**
 * Delete a checklist item
 */
export const deleteChecklistItem = (itemId) => 
  api.delete(`/cards/checklist/${itemId}`);
