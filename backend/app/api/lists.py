from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.list import ListCreate, ListOut, ListUpdate, ListMove
from app.crud.list import create_list, get_list, update_list, delete_list, reorder_lists
from app.database import get_db

router = APIRouter(prefix="/lists", tags=["lists"])

@router.post("/", response_model=ListOut)
def create(data: ListCreate, db: Session = Depends(get_db)):
    """Create a new list in a board"""
    return create_list(db, data)

@router.get("/{list_id}", response_model=ListOut)
def read(list_id: int, db: Session = Depends(get_db)):
    """Get a specific list with its cards"""
    db_list = get_list(db, list_id)
    if not db_list:
        raise HTTPException(status_code=404, detail="List not found")
    return db_list

@router.patch("/{list_id}", response_model=ListOut)
def update(list_id: int, data: ListUpdate, db: Session = Depends(get_db)):
    """Update a list (title or position)"""
    db_list = update_list(db, list_id, data)
    if not db_list:
        raise HTTPException(status_code=404, detail="List not found")
    return db_list

@router.delete("/{list_id}")
def delete(list_id: int, db: Session = Depends(get_db)):
    """Delete a list and all its cards"""
    if not delete_list(db, list_id):
        raise HTTPException(status_code=404, detail="List not found")
    return {"message": "List deleted successfully"}

@router.patch("/{list_id}/move", response_model=ListOut)
def move(list_id: int, data: ListMove, db: Session = Depends(get_db)):
    """Reorder a list (drag and drop)"""
    db_list = get_list(db, list_id)
    if not db_list:
        raise HTTPException(status_code=404, detail="List not found")
    
    result = reorder_lists(db, db_list.board_id, list_id, data.position)
    if not result:
        raise HTTPException(status_code=400, detail="Failed to move list")
    return result
