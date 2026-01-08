/**
 * BoardPage.jsx - Main Board Page Component
 * 
 * This is the main page component that:
 * - Automatically fetches or creates a board on load
 * - Uses the useBoard hook to fetch board data
 * - Renders the BoardHeader for search/filter
 * - Renders the Board with lists and cards
 * - Handles search result state
 */

import React, { useState, useEffect } from 'react';
import BoardHeader from '../components/board/BoardHeader';
import Board from '../components/board/Board';
import useBoard from '../hooks/useBoard';
import { createBoard, getBoards } from '../api/boards';

function BoardPage() {
  // State for board ID (will be set after fetching/creating)
  const [boardId, setBoardId] = useState(null);
  const [initializing, setInitializing] = useState(true);
  
  // Use our custom hook to fetch board data
  const { board, labels, members, loading, error, refetch } = useBoard(boardId);
  
  // State for search results (null = no search, array = filtered cards)
  const [searchResults, setSearchResults] = useState(null);

  /**
   * Initialize: Check for existing boards or create one
   */
  useEffect(() => {
    const initBoard = async () => {
      try {
        // Try to get existing boards
        const res = await getBoards();
        if (res.data && res.data.length > 0) {
          // Use the first board
          setBoardId(res.data[0].id);
        } else {
          // No boards exist, create one
          const newBoard = await createBoard('My Trello Board');
          setBoardId(newBoard.data.id);
        }
      } catch (err) {
        console.error('Failed to initialize board:', err);
      } finally {
        setInitializing(false);
      }
    };
    initBoard();
  }, []);

  /**
   * Handle search results from BoardHeader
   */
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  // Show loading state
  if (initializing || loading) {
    return <div className="loading">Loading board...</div>;
  }

  // Show error state
  if (error) {
    return (
      <div className="empty-state">
        <h2>Error loading board</h2>
        <p>{error}</p>
        <p>Please check your internet connection and refresh the page.</p>
      </div>
    );
  }

  // Show empty state if no board
  if (!board) {
    return (
      <div className="empty-state">
        <h2>No board found</h2>
        <p>Please refresh the page to create a new board.</p>
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
