from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.label import LabelOut, LabelCreate
from app.crud.label import get_labels, get_label, create_label, delete_label
from app.database import get_db

router = APIRouter(prefix="/labels", tags=["labels"])

@router.get("/", response_model=List[LabelOut])
def list_labels(db: Session = Depends(get_db)):
    """Get all available labels"""
    return get_labels(db)

@router.get("/{label_id}", response_model=LabelOut)
def read_label(label_id: int, db: Session = Depends(get_db)):
    """Get a specific label"""
    label = get_label(db, label_id)
    if not label:
        raise HTTPException(status_code=404, detail="Label not found")
    return label

@router.post("/", response_model=LabelOut)
def create(data: LabelCreate, db: Session = Depends(get_db)):
    """Create a new label"""
    return create_label(db, data)

@router.delete("/{label_id}")
def delete(label_id: int, db: Session = Depends(get_db)):
    """Delete a label"""
    if not delete_label(db, label_id):
        raise HTTPException(status_code=404, detail="Label not found")
    return {"message": "Label deleted successfully"}
