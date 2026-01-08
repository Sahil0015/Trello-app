/**
 * Card.jsx - Card Component
 * 
 * Displays a single card with:
 * - Labels (colored bars)
 * - Title
 * - Badges (due date, description indicator, checklist progress, members)
 * 
 * Clicking the card opens the CardModal for detailed editing.
 * 
 * Props:
 * - card: Card data object
 * - listId: ID of the list containing this card
 * - labels: Available labels for assignment
 * - members: Available members for assignment
 * - onRefresh: Callback to refresh board after changes
 * - isHighlighted: Whether this card matches search criteria
 */

import React, { useState } from 'react';
import CardLabels from './CardLabels';
import CardModal from './CardModal';

export function Card({ card, listId, labels, members, onRefresh, isHighlighted }) {
  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  /**
   * Format due date and check if overdue or due soon
   */
  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isOverdue = date < today;
    const isDueSoon = date >= today && date <= tomorrow;
    
    return {
      text: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isOverdue,
      isDueSoon
    };
  };

  const dueDate = formatDueDate(card.due_date);
  
  // Calculate checklist progress
  const checklistProgress = card.checklist_items?.length > 0
    ? `${card.checklist_items.filter(i => i.is_completed).length}/${card.checklist_items.length}`
    : null;

  return (
    <>
      {/* Card container */}
      <div 
        className={`card ${isHighlighted ? 'highlighted' : ''}`}
        onClick={() => setShowModal(true)}
        style={isHighlighted ? { border: '2px solid #0079bf' } : {}}
      >
        {/* Labels row */}
        <CardLabels labels={card.labels} />
        
        {/* Card title */}
        <div className="card-title">{card.title}</div>
        
        {/* Badges row */}
        <div className="card-badges">
          {/* Due date badge */}
          {dueDate && (
            <span className={`card-badge ${dueDate.isOverdue ? 'overdue' : dueDate.isDueSoon ? 'due-soon' : ''}`}>
              📅 {dueDate.text}
            </span>
          )}
          
          {/* Description indicator */}
          {card.description && (
            <span className="card-badge">📝</span>
          )}
          
          {/* Checklist progress */}
          {checklistProgress && (
            <span className="card-badge">☑️ {checklistProgress}</span>
          )}
          
          {/* Member avatars */}
          {card.members && card.members.length > 0 && (
            <div className="card-members">
              {card.members.slice(0, 3).map(member => (
                <div
                  key={member.id}
                  className="member-avatar"
                  style={{ backgroundColor: member.avatar_color || '#5e6c84' }}
                  title={member.name}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card detail modal */}
      <CardModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        card={card}
        listId={listId}
        allLabels={labels}
        allMembers={members}
        onRefresh={onRefresh}
      />
    </>
  );
}

export default Card;
