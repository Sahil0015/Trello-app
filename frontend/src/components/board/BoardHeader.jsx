/**
 * BoardHeader.jsx - Board Header with Search & Filters
 * 
 * Displays the board title and provides search/filter functionality.
 * Users can filter cards by:
 * - Text search (matches title/description)
 * - Label filter
 * - Member filter
 * 
 * Props:
 * - title: Board title to display
 * - boardId: The board ID for search API calls
 * - labels: Available labels for filter dropdown
 * - members: Available members for filter dropdown
 * - onSearch: Callback with search results (or null to clear)
 */

import React, { useState } from 'react';
import { searchCards } from '../../api/boards';

export function BoardHeader({ title, labels, members, onSearch }) {
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [labelFilter, setLabelFilter] = useState('');
  const [memberFilter, setMemberFilter] = useState('');

  /**
   * Perform search with current filters
   */
  const handleSearch = async () => {
    const filters = {};
    if (searchQuery) filters.q = searchQuery;
    if (labelFilter) filters.label_id = labelFilter;
    if (memberFilter) filters.member_id = memberFilter;
    
    // Only search if at least one filter is set
    if (Object.keys(filters).length > 0) {
      try {
        const res = await searchCards(filters);
        onSearch(res.data);
      } catch (err) {
        console.error('Search failed:', err);
      }
    } else {
      onSearch(null); // Clear search results
    }
  };

  /**
   * Search on Enter key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  /**
   * Clear all filters and search results
   */
  const clearFilters = () => {
    setSearchQuery('');
    setLabelFilter('');
    setMemberFilter('');
    onSearch(null);
  };

  return (
    <div className="board-header">
      <h1 className="board-title">{title}</h1>
      
      {/* Search and filter controls */}
      <div className="search-container">
        {/* Text search input */}
        <input
          type="text"
          className="search-input"
          placeholder="Search cards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        
        {/* Label filter dropdown */}
        <select 
          className="filter-select" 
          value={labelFilter}
          onChange={(e) => setLabelFilter(e.target.value)}
        >
          <option value="">All Labels</option>
          {labels.map(label => (
            <option key={label.id} value={label.id}>{label.name}</option>
          ))}
        </select>
        
        {/* Member filter dropdown */}
        <select 
          className="filter-select"
          value={memberFilter}
          onChange={(e) => setMemberFilter(e.target.value)}
        >
          <option value="">All Members</option>
          {members.map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
        
        {/* Search button */}
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        
        {/* Clear button (only shown when filters are active) */}
        {(searchQuery || labelFilter || memberFilter) && (
          <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
        )}
      </div>
    </div>
  );
}

export default BoardHeader;
