/**
 * Modal.jsx - Reusable Modal Component
 * 
 * A modal dialog that overlays the page content.
 * Clicking the overlay or X button closes the modal.
 * 
 * Props:
 * - isOpen: Boolean to control visibility
 * - onClose: Function called when modal should close
 * - children: Content to display inside the modal
 */

import React from 'react';

export function Modal({ isOpen, onClose, children }) {
  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    // Overlay - clicking it closes the modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Modal content - stop propagation to prevent closing when clicking inside */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
