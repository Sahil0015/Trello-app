/**
 * List.jsx - List Component
 * 
 * Displays a single list with its cards.
 * Features:
 * - Drag-and-drop sorting for cards within the list
 * - Add new cards
 * - Cards are sortable using @dnd-kit
 * 
 * Props:
 * - list: List data object with cards array
 * - labels: Available labels for cards
 * - members: Available members for cards
 * - onRefresh: Callback to refresh board after changes
 * - highlightCards: Array of card IDs to highlight (from search)
 */

import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import ListHeader from './ListHeader';
import Card from '../card/Card';
import { SortableCard } from '../../dnd/SortableCard';
import { createCard } from '../../api/cards';
import Button from '../common/Button';

export function List({ list, labels, members, onRefresh, highlightCards }) {
  // State for add card form
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');

  // Make this list a droppable target for cards
  const { setNodeRef } = useDroppable({
    id: `list-${list.id}`,
  });

  // Get and sort cards (filter out archived if any)
  const cards = (list.cards || [])
    .filter(card => !card.archived)
    .sort((a, b) => a.position - b.position);

  /**
   * Handle adding a new card
   */
  const handleAddCard = async (e) => {
    e.preventDefault();
    if (!newCardTitle.trim()) return;

    try {
      const position = cards.length; // Add at end
      await createCard(newCardTitle.trim(), list.id, position);
      setNewCardTitle('');
      setIsAddingCard(false);
      onRefresh();
    } catch (err) {
      console.error('Failed to create card:', err);
    }
  };

  /**
   * Cancel adding card
   */
  const handleCancel = () => {
    setNewCardTitle('');
    setIsAddingCard(false);
  };

  return (
    <div className="list">
      {/* List title and menu */}
      <ListHeader list={list} onRefresh={onRefresh} />
      
      {/* Cards container - droppable area */}
      <div className="list-cards" ref={setNodeRef}>
        <SortableContext
          items={cards.map(c => `card-${c.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {cards.map(card => (
            <SortableCard key={card.id} id={`card-${card.id}`}>
              <Card
                card={card}
                listId={list.id}
                labels={labels}
                members={members}
                onRefresh={onRefresh}
                isHighlighted={highlightCards?.includes(card.id)}
              />
            </SortableCard>
          ))}
        </SortableContext>
      </div>

      {/* Add card form or button */}
      {isAddingCard ? (
        <form className="add-card-form" onSubmit={handleAddCard}>
          <textarea
            placeholder="Enter a title for this card..."
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            autoFocus
          />
          <div className="form-actions">
            <Button type="submit">Add Card</Button>
            <Button variant="secondary" onClick={handleCancel}>×</Button>
          </div>
        </form>
      ) : (
        <button className="add-btn" onClick={() => setIsAddingCard(true)}>
          + Add a card
        </button>
      )}
    </div>
  );
}

export default List;
