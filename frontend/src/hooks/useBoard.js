/**
 * useBoard.js - Custom Hook for Board Data Management
 * 
 * This hook handles:
 * - Fetching board data with lists and cards from the API
 * - Storing labels and members for the board
 * - Loading and error states
 * - Refetch function for refreshing data after updates
 * 
 * Usage: const { board, labels, members, loading, error, refetch, setBoard } = useBoard(1);
 */

import { useState, useEffect, useCallback } from 'react';
import { getBoard } from '../api/boards';
import api from '../api/axios';

export function useBoard(boardId) {
  // State for board data (includes lists and cards)
  const [board, setBoard] = useState(null);
  
  // State for labels available in the board
  const [labels, setLabels] = useState([]);
  
  // State for members available in the board
  const [members, setMembers] = useState([]);
  
  // Loading state for showing spinner/skeleton
  const [loading, setLoading] = useState(true);
  
  // Error state for displaying error messages
  const [error, setError] = useState(null);

  /**
   * Fetch board data from API
   * Uses useCallback to prevent unnecessary re-renders
   */
  const fetchBoard = useCallback(async () => {
    if (!boardId) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Fetch board data (includes lists and cards)
      const boardRes = await getBoard(boardId);
      setBoard(boardRes.data);
      
      // Fetch labels and members
      // These are separate API calls since they're board-level resources
      try {
        const [labelsRes, membersRes] = await Promise.all([
          api.get('/labels/'),
          api.get('/members/')
        ]);
        setLabels(labelsRes.data);
        setMembers(membersRes.data);
      } catch (e) {
        // If labels/members endpoints fail, continue with empty arrays
        console.warn('Could not fetch labels/members:', e);
        setLabels([]);
        setMembers([]);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching board:', err);
      setError(err.message || 'Failed to load board');
    } finally {
      setLoading(false);
    }
  }, [boardId]);

  // Fetch board when component mounts or boardId changes
  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  // Return all state and functions needed by components
  return { 
    board,           // Board data with lists and cards
    setBoard,        // Function to update board state locally
    labels,          // Available labels
    members,         // Available members
    loading,         // Loading state
    error,           // Error message if any
    refetch: fetchBoard  // Function to refresh data
  };
}

export default useBoard;
