/**
 * BoardPage.jsx - Main Board Page Component
 * 
 * This is the main page component that:
 * - Uses the useBoard hook to fetch board data
 * - Renders the BoardHeader for search/filter
 * - Renders the Board with lists and cards
 * - Handles search result state
 * 
 * Uses a hardcoded boardId = 1 (from seed data)
 */

import React, { useState } from 'react';
import BoardHeader from '../components/board/BoardHeader';
import Board from '../components/board/Board';
import useBoard from '../hooks/useBoard';

function BoardPage() {
  // Hardcoded board ID - from seed data
  const BOARD_ID = 1;
  
  // Use our custom hook to fetch board data
  const { board, labels, members, loading, error, refetch } = useBoard(BOARD_ID);
  
  // State for search results (null = no search, array = filtered cards)
  const [searchResults, setSearchResults] = useState(null);

  /**
   * Handle search results from BoardHeader
   */
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  // Show loading state
  if (loading) {
    return <div className="loading">Loading board...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="empty-state">
        <h2>Error loading board</h2>
        <p>{error}</p>
        <p>Make sure the backend is running on http://localhost:8000</p>
      </div>
    );
  }

  // Show empty state if no board
  if (!board) {
    return (
      <div className="empty-state">
        <h2>No board found</h2>
        <p>Run the backend seed script to create sample data.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header with title and search/filter */}
      <BoardHeader 
        title={board.title} 
        labels={labels}
        members={members}
        onSearch={handleSearch}
      />
      
      {/* Board with lists and cards */}
      <Board 
        board={board} 
        labels={labels}
        members={members}
        onRefresh={refetch}
        searchResults={searchResults}
      />
    </div>
  );
}

export default BoardPage;
