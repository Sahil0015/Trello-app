/**
 * CardModal.jsx - Card Detail Modal Component
 * 
 * Full-featured card editing modal with:
 * - Editable title and description
 * - Due date picker
 * - Label management
 * - Member assignment
 * - Checklist with progress tracking
 * - Delete card action
 * 
 * Props:
 * - isOpen: Whether modal is visible
 * - onClose: Function to close modal
 * - card: Card data object
 * - listId: ID of the list containing the card
 * - allLabels: All available labels for assignment
 * - allMembers: All available members for assignment
 * - onRefresh: Callback to refresh board after changes
 */

import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import {
  updateCard,
  deleteCard,
  addLabelToCard,
  removeLabelFromCard,
  addMemberToCard,
  removeMemberFromCard,
  addChecklistItem,
  toggleChecklistItem,
  deleteChecklistItem
} from '../../api/cards';

export function CardModal({ isOpen, onClose, card, listId, allLabels, allMembers, onRefresh }) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.due_date || '');
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [showLabelPicker, setShowLabelPicker] = useState(false);
  const [showMemberPicker, setShowMemberPicker] = useState(false);

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description || '');
    setDueDate(card.due_date || '');
  }, [card]);

  const handleSaveTitle = async () => {
    if (title.trim() && title !== card.title) {
      try {
        await updateCard(card.id, { title: title.trim() });
        onRefresh();
      } catch (err) {
        console.error('Failed to update title:', err);
      }
    }
  };

  const handleSaveDescription = async () => {
    if (description !== card.description) {
      try {
        await updateCard(card.id, { description });
        onRefresh();
      } catch (err) {
        console.error('Failed to update description:', err);
      }
    }
  };

  const handleSaveDueDate = async (newDate) => {
    setDueDate(newDate);
    try {
      await updateCard(card.id, { due_date: newDate || null });
      onRefresh();
    } catch (err) {
      console.error('Failed to update due date:', err);
    }
  };

  /**
   * Handle deleting the card
   */
  const handleDelete = async () => {
    if (window.confirm('Delete this card?')) {
      try {
        await deleteCard(card.id);
        onClose();
        onRefresh();
      } catch (err) {
        console.error('Failed to delete card:', err);
      }
    }
  };

  // ===== LABEL OPERATIONS =====
  const handleToggleLabel = async (label) => {
    const hasLabel = card.labels?.some(l => l.id === label.id);
    try {
      if (hasLabel) {
        await removeLabelFromCard(card.id, label.id);
      } else {
        await addLabelToCard(card.id, label.id);
      }
      onRefresh();
    } catch (err) {
      console.error('Failed to toggle label:', err);
    }
  };

  // Members
  const handleToggleMember = async (member) => {
    const hasMember = card.members?.some(m => m.id === member.id);
    try {
      if (hasMember) {
        await removeMemberFromCard(card.id, member.id);
      } else {
        await addMemberToCard(card.id, member.id);
      }
      onRefresh();
    } catch (err) {
      console.error('Failed to toggle member:', err);
    }
  };

  // Checklist
  const handleAddChecklistItem = async (e) => {
    e.preventDefault();
    if (!newChecklistItem.trim()) return;
    try {
      await addChecklistItem(card.id, newChecklistItem.trim());
      setNewChecklistItem('');
      onRefresh();
    } catch (err) {
      console.error('Failed to add checklist item:', err);
    }
  };

  /**
   * Handle toggling a checklist item's completion status
   */
  const handleToggleChecklistItem = async (itemId) => {
    try {
      await toggleChecklistItem(itemId);
      onRefresh();
    } catch (err) {
      console.error('Failed to toggle checklist item:', err);
    }
  };

  /**
   * Handle deleting a checklist item
   */
  const handleDeleteChecklistItem = async (itemId) => {
    try {
      await deleteChecklistItem(itemId);
      onRefresh();
    } catch (err) {
      console.error('Failed to delete checklist item:', err);
    }
  };

  const checklistItems = card.checklist_items || [];
  const completedCount = checklistItems.filter(i => i.is_completed).length;
  const progressPercent = checklistItems.length > 0 
    ? Math.round((completedCount / checklistItems.length) * 100) 
    : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal-header">
        <input
          type="text"
          className="modal-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSaveTitle}
        />
        <div className="modal-subtitle">in list {card.list_id}</div>
      </div>

      <div className="modal-body">
        <div className="modal-main">
          {/* Labels */}
          {card.labels && card.labels.length > 0 && (
            <div className="section">
              <div className="section-title">Labels</div>
              <div className="labels-list">
                {card.labels.map(label => (
                  <span
                    key={label.id}
                    className="label-tag"
                    style={{ backgroundColor: label.color }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Members */}
          {card.members && card.members.length > 0 && (
            <div className="section">
              <div className="section-title">Members</div>
              <div className="members-list">
                {card.members.map(member => (
                  <div key={member.id} className="member-tag">
                    <div
                      className="member-avatar"
                      style={{ backgroundColor: member.avatar_color || '#5e6c84' }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    {member.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Due Date Display */}
          {dueDate && (
            <div className="section">
              <div className="section-title">Due Date</div>
              <div>{new Date(dueDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</div>
            </div>
          )}

          {/* Description */}
          <div className="section">
            <div className="section-title">Description</div>
            <textarea
              className="description-input"
              placeholder="Add a more detailed description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleSaveDescription}
            />
          </div>

          {/* Checklist */}
          <div className="section">
            <div className="section-title">Checklist</div>
            {checklistItems.length > 0 && (
              <div className="checklist-progress">
                <div className="progress-text">{progressPercent}%</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
            
            {checklistItems.map(item => (
              <div key={item.id} className="checklist-item">
                <input
                  type="checkbox"
                  checked={item.is_completed}
                  onChange={() => handleToggleChecklistItem(item.id)}
                />
                <span className={item.is_completed ? 'completed' : ''}>
                  {item.text}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteChecklistItem(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
            
            <form onSubmit={handleAddChecklistItem}>
              <input
                type="text"
                className="add-item-input"
                placeholder="Add an item..."
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className="modal-sidebar">
          <div className="section-title">Add to card</div>
          
          {/* Labels Button */}
          <div className="dropdown">
            <button 
              className="sidebar-btn"
              onClick={() => setShowLabelPicker(!showLabelPicker)}
            >
              🏷️ Labels
            </button>
            {showLabelPicker && (
              <div className="dropdown-menu">
                {allLabels.map(label => (
                  <div
                    key={label.id}
                    className="dropdown-item"
                    onClick={() => handleToggleLabel(label)}
                  >
                    <div
                      className="color-box"
                      style={{ backgroundColor: label.color }}
                    />
                    {label.name}
                    {card.labels?.some(l => l.id === label.id) && ' ✓'}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Members Button */}
          <div className="dropdown">
            <button 
              className="sidebar-btn"
              onClick={() => setShowMemberPicker(!showMemberPicker)}
            >
              👤 Members
            </button>
            {showMemberPicker && (
              <div className="dropdown-menu">
                {allMembers.map(member => (
                  <div
                    key={member.id}
                    className="dropdown-item"
                    onClick={() => handleToggleMember(member)}
                  >
                    <div
                      className="member-avatar"
                      style={{ backgroundColor: member.avatar_color || '#5e6c84' }}
                    >
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                    {member.name}
                    {card.members?.some(m => m.id === member.id) && ' ✓'}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Due Date */}
          <div className="section" style={{ marginTop: 8 }}>
            <div className="section-title">Due Date</div>
            <input
              type="date"
              className="due-date-input"
              value={dueDate}
              onChange={(e) => handleSaveDueDate(e.target.value)}
            />
          </div>

          <div className="section-title" style={{ marginTop: 16 }}>Actions</div>
          <Button variant="danger" onClick={handleDelete} className="sidebar-btn">
            🗑️ Delete Card
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default CardModal;
