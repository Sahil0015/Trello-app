/**
 * Board.jsx - Main Board Component
 * 
 * Displays all lists and cards in a horizontal layout.
 * Handles drag-and-drop context for moving cards between lists.
 * 
 * Props:
 * - board: The board data object containing lists and cards
 * - labels: Available labels for cards
 * - members: Available members to assign to cards
 * - onRefresh: Callback to refresh board data after changes
 * - searchResults: Array of cards matching search (null = show all)
 */

import React from 'react';
import List from '../list/List';
import AddList from '../list/AddList';
import { moveCard } from '../../api/cards';
import { DndProvider, SortableContext, horizontalListSortingStrategy } from '../../dnd/DndProvider';

export function Board({ board, labels, members, onRefresh, searchResults }) {
  // Get lists from board, default to empty array
  const lists = board?.lists || [];
  
  /**
   * Handle drag end event
   * Called when a card is dropped after dragging
   */
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    // No drop target
    if (!over) return;

    // Extract numeric card id from draggable id `card-<id>`
    const activeCardId = Number(String(active.id).replace('card-', ''));
    if (!activeCardId) return;

    // Helper to find a list that contains a given card id
    const findListByCardId = (cardId) =>
      lists.find((list) => (list.cards || []).some((c) => c.id === cardId));

    const sourceList = findListByCardId(activeCardId);
    if (!sourceList) return;

    // Determine target list and target index
    let targetList = null;
    let targetIndex = 0;

    const overId = String(over.id);

    if (overId.startsWith('card-')) {
      // Dropped on top of another card -> same list as that card
      const targetCardId = Number(overId.replace('card-', ''));
      targetList = findListByCardId(targetCardId);
      if (!targetList) return;

      const sortedCards = (targetList.cards || []).slice().sort((a, b) => a.position - b.position);
      targetIndex = sortedCards.findIndex((c) => c.id === targetCardId);
      if (targetIndex < 0) return;
    } else if (overId.startsWith('list-')) {
      // Dropped into empty space of a list -> append to that list
      const targetListId = Number(overId.replace('list-', ''));
      targetList = lists.find((l) => l.id === targetListId);
      if (!targetList) return;

      const sortedCards = (targetList.cards || []).slice().sort((a, b) => a.position - b.position);
      targetIndex = sortedCards.length; // append to end
    } else {
      return;
    }

    // If nothing changed, exit
    if (targetList.id === sourceList.id && over.id === active.id) return;

    try {
      await moveCard(activeCardId, targetList.id, targetIndex);
      onRefresh();
    } catch (err) {
      console.error('Failed to move card:', err);
    }
  };

  /**
   * Filter cards based on search results
   * If search is active, only show matching cards
   */
  const getFilteredCards = (listCards) => {
    if (!searchResults) return listCards;
    const searchIds = searchResults.map(c => c.id);
    return listCards.filter(card => searchIds.includes(card.id));
  };

  return (
    <DndProvider onDragEnd={handleDragEnd}>
      <div className="board-container">
        {/* SortableContext enables drag sorting for lists */}
        <SortableContext 
          items={lists.map(l => `list-${l.id}`)} 
          strategy={horizontalListSortingStrategy}
        >
          {/* Render lists sorted by position */}
          {lists
            .sort((a, b) => a.position - b.position)
            .map(list => (
              <List
                key={list.id}
                list={{
                  ...list,
                  cards: getFilteredCards(list.cards || [])
                }}
                labels={labels}
                members={members}
                onRefresh={onRefresh}
                highlightCards={searchResults?.map(c => c.id)}
              />
            ))}
        </SortableContext>
        
        {/* Button to add a new list */}
        <AddList boardId={board.id} onAdd={onRefresh} />
      </div>
    </DndProvider>
  );
}

export default Board;
