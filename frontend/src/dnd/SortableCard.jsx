/**
 * SortableCard.jsx - Draggable Card Wrapper
 * 
 * This component makes a card draggable within the board.
 * It wraps card content and provides drag-and-drop functionality.
 * 
 * Uses @dnd-kit/sortable for sorting capabilities.
 * 
 * Props:
 * - id: Unique identifier for the card (required for sorting)
 * - children: The card content to render
 * 
 * The useSortable hook provides:
 * - attributes: A11y attributes for the draggable element
 * - listeners: Event handlers for drag detection
 * - setNodeRef: Ref to attach to the DOM element
 * - transform: Current drag transform (x, y position)
 * - transition: CSS transition for smooth animations
 * - isDragging: Whether this card is currently being dragged
 */

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function SortableCard({ id, children }) {
  // Get sortable properties from the hook
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  // Style object for drag transform
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,  // Fade when dragging
    cursor: 'grab',
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={isDragging ? 'dragging' : ''}
    >
      {children}
    </div>
  );
}

export default SortableCard;
