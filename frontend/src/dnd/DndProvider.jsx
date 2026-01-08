/**
 * DndProvider.jsx - Drag and Drop Context Provider
 * 
 * This component wraps the board to enable drag-and-drop functionality.
 * Uses @dnd-kit library for accessible, performant drag-and-drop.
 * 
 * Key concepts:
 * - DndContext: The main context that enables drag-and-drop
 * - Sensors: Define how drag is triggered (pointer, keyboard, touch)
 * - Collision Detection: Algorithm to determine drop targets
 * 
 * Props:
 * - children: The board content to wrap
 * - onDragEnd: Callback when a card is dropped
 */

import React from 'react';
import { 
  DndContext, 
  closestCorners, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  SortableContext, 
  horizontalListSortingStrategy 
} from '@dnd-kit/sortable';

export function DndProvider({ children, onDragEnd }) {
  /**
   * Configure sensors for drag detection
   * - PointerSensor: Handles mouse and touch
   * - distance: 8px movement required before drag starts
   *   (prevents accidental drags when clicking)
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,  // Must move 8px before drag starts
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}  // Use closest corners algorithm
      onDragEnd={onDragEnd}                // Handle drop
    >
      {children}
    </DndContext>
  );
}

// Re-export for convenience in other components
export { SortableContext, horizontalListSortingStrategy };
export default DndProvider;
