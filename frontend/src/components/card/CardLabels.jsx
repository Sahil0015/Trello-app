/**
 * CardLabels.jsx - Card Labels Display Component
 * 
 * Displays colored label bars on a card.
 * Each label is shown as a small colored rectangle.
 * 
 * Props:
 * - labels: Array of label objects with id, name, and color
 */

import React from 'react';

export function CardLabels({ labels }) {
  // Don't render if no labels
  if (!labels || labels.length === 0) return null;

  return (
    <div className="card-labels">
      {labels.map(label => (
        <div
          key={label.id}
          className="card-label"
          style={{ backgroundColor: label.color }}
          title={label.name}
        />
      ))}
    </div>
  );
}

export default CardLabels;
