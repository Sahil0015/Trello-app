/**
 * AddList.jsx - Add New List Component
 * 
 * Displays a button that expands into a form for adding new lists.
 * 
 * Props:
 * - boardId: The board ID to add the list to
 * - onAdd: Callback to refresh board after adding
 */

import React, { useState } from 'react';
import { createList } from '../../api/lists';
import Button from '../common/Button';

export function AddList({ boardId, onAdd }) {
  // State for form visibility and input
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  /**
   * Handle form submission to create a new list
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createList(title.trim(), boardId);
      setTitle('');
      setIsAdding(false);
      onAdd();
    } catch (err) {
      console.error('Failed to create list:', err);
    }
  };

  /**
   * Cancel adding list
   */
  const handleCancel = () => {
    setTitle('');
    setIsAdding(false);
  };

  // Show add button when not adding
  if (!isAdding) {
    return (
      <div className="add-list">
        <button className="add-list-btn" onClick={() => setIsAdding(true)}>
          + Add another list
        </button>
      </div>
    );
  }

  // Show form when adding
  return (
    <div className="add-list">
      <form className="add-list-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter list title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <div className="form-actions">
          <Button type="submit">Add List</Button>
          <Button variant="secondary" onClick={handleCancel}>×</Button>
        </div>
      </form>
    </div>
  );
}

export default AddList;
