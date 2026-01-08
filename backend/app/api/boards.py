from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.board import BoardCreate, BoardOut
from app.crud.board import create_board, get_board, get_all_boards, delete_board
from app.database import get_db

router = APIRouter(prefix="/boards", tags=["boards"])

@router.get("/", response_model=List[BoardOut])
def list_boards(db: Session = Depends(get_db)):
    """Get all boards"""
    return get_all_boards(db)

@router.post("/", response_model=BoardOut)
def create(board: BoardCreate, db: Session = Depends(get_db)):
    """Create a new board"""
    return create_board(db, board)

@router.get("/{board_id}", response_model=BoardOut)
def read(board_id: int, db: Session = Depends(get_db)):
    """Get a specific board with all its lists and cards"""
    board = get_board(db, board_id)
    if not board:
        raise HTTPException(status_code=404, detail="Board not found")
    return board

@router.delete("/{board_id}")
def delete(board_id: int, db: Session = Depends(get_db)):
    """Delete a board"""
    if not delete_board(db, board_id):
        raise HTTPException(status_code=404, detail="Board not found")
    return {"message": "Board deleted successfully"}
