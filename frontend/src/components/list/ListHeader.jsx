/**
 * ListHeader.jsx - List Header Component
 * 
 * Displays the list title (editable) and provides a menu for list actions.
 * 
 * Props:
 * - list: List data object
 * - onRefresh: Callback to refresh board after changes
 */

import React, { useState } from 'react';
import { updateList, deleteList } from '../../api/lists';

export function ListHeader({ list, onRefresh }) {
  // State for editing mode and title
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [showMenu, setShowMenu] = useState(false);

  /**
   * Save the edited title
   */
  const handleSave = async () => {
    if (title.trim() && title !== list.title) {
      try {
        await updateList(list.id, { title: title.trim() });
        onRefresh();
      } catch (err) {
        console.error('Failed to update list:', err);
      }
    }
    setIsEditing(false);
  };

  /**
   * Delete the list (with confirmation)
   */
  const handleDelete = async () => {
    if (window.confirm('Delete this list and all its cards?')) {
      try {
        await deleteList(list.id);
        onRefresh();
      } catch (err) {
        console.error('Failed to delete list:', err);
      }
    }
    setShowMenu(false);
  };

  /**
   * Handle keyboard events for title input
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setTitle(list.title);
      setIsEditing(false);
    }
  };

  return (
    <div className="list-header">
      {/* Editable title */}
      {isEditing ? (
        <input
          type="text"
          className="list-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <span 
          className="list-title" 
          onClick={() => setIsEditing(true)}
        >
          {list.title}
        </span>
      )}
      
      {/* Dropdown menu */}
      <div className="dropdown">
        <button 
          className="list-menu-btn"
          onClick={() => setShowMenu(!showMenu)}
        >
          ⋯
        </button>
        {showMenu && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleDelete}>
              🗑️ Delete List
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListHeader;
