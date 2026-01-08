/**
 * Button.jsx - Reusable Button Component
 * 
 * A simple button component with variant styling.
 * 
 * Props:
 * - children: Button content/label
 * - variant: 'primary' | 'secondary' | 'danger' (default: 'primary')
 * - onClick: Click handler function
 * - type: Button type for forms (default: 'button')
 * - className: Additional CSS classes
 */

import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button', 
  className = '' 
}) {
  // Determine button style based on variant
  const baseClass = variant === 'primary' ? 'btn btn-primary' : 
                    variant === 'danger' ? 'btn btn-danger' : 'btn btn-secondary';
  
  return (
    <button 
      type={type} 
      className={`${baseClass} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
