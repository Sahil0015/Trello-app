from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.card import CardCreate, CardUpdate, CardOut, CardMove
from app.schemas.checklist import ChecklistItemCreate, ChecklistItemUpdate, ChecklistItemOut
from app.crud.card import (
    create_card, get_card, update_card, delete_card, archive_card, move_card,
    add_label_to_card, remove_label_from_card, add_member_to_card, remove_member_from_card
)
from app.crud.checklist import (
    create_checklist_item, get_checklist_items, update_checklist_item,
    delete_checklist_item, toggle_checklist_item
)
from app.database import get_db
from typing import List

router = APIRouter(prefix="/cards", tags=["cards"])

@router.post("/", response_model=CardOut)
def create(data: CardCreate, db: Session = Depends(get_db)):
    """Create a new card"""
    return create_card(db, data)

@router.get("/{card_id}", response_model=CardOut)
def read(card_id: int, db: Session = Depends(get_db)):
    """Get a specific card with all details"""
    card = get_card(db, card_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

@router.patch("/{card_id}", response_model=CardOut)
def update(card_id: int, data: CardUpdate, db: Session = Depends(get_db)):
    """Update card details"""
    card = update_card(db, card_id, data)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

@router.delete("/{card_id}")
def delete(card_id: int, db: Session = Depends(get_db)):
    """Delete a card"""
    if not delete_card(db, card_id):
        raise HTTPException(status_code=404, detail="Card not found")
    return {"message": "Card deleted successfully"}

@router.patch("/{card_id}/archive", response_model=CardOut)
def archive(card_id: int, db: Session = Depends(get_db)):
    """Archive a card"""
    card = archive_card(db, card_id, True)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

@router.patch("/{card_id}/unarchive", response_model=CardOut)
def unarchive(card_id: int, db: Session = Depends(get_db)):
    """Unarchive a card"""
    card = archive_card(db, card_id, False)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

@router.patch("/{card_id}/move", response_model=CardOut)
def move(card_id: int, data: CardMove, db: Session = Depends(get_db)):
    """Move card to another list and/or position (drag and drop)"""
    card = move_card(db, card_id, data.list_id, data.position)
    if not card:
        raise HTTPException(status_code=404, detail="Card not found")
    return card

# Label endpoints for cards
@router.post("/{card_id}/labels/{label_id}", response_model=CardOut)
def add_label(card_id: int, label_id: int, db: Session = Depends(get_db)):
    """Add a label to a card"""
    card = add_label_to_card(db, card_id, label_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card or Label not found")
    return card

@router.delete("/{card_id}/labels/{label_id}", response_model=CardOut)
def remove_label(card_id: int, label_id: int, db: Session = Depends(get_db)):
    """Remove a label from a card"""
    card = remove_label_from_card(db, card_id, label_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card or Label not found")
    return card

# Member endpoints for cards
@router.post("/{card_id}/members/{member_id}", response_model=CardOut)
def add_member(card_id: int, member_id: int, db: Session = Depends(get_db)):
    """Assign a member to a card"""
    card = add_member_to_card(db, card_id, member_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card or Member not found")
    return card

@router.delete("/{card_id}/members/{member_id}", response_model=CardOut)
def remove_member(card_id: int, member_id: int, db: Session = Depends(get_db)):
    """Remove a member from a card"""
    card = remove_member_from_card(db, card_id, member_id)
    if not card:
        raise HTTPException(status_code=404, detail="Card or Member not found")
    return card

# Checklist endpoints for cards
@router.get("/{card_id}/checklist", response_model=List[ChecklistItemOut])
def get_checklist(card_id: int, db: Session = Depends(get_db)):
    """Get all checklist items for a card"""
    return get_checklist_items(db, card_id)

@router.post("/{card_id}/checklist", response_model=ChecklistItemOut)
def add_checklist_item(card_id: int, data: ChecklistItemCreate, db: Session = Depends(get_db)):
    """Add a checklist item to a card"""
    data.card_id = card_id
    return create_checklist_item(db, data)

@router.patch("/checklist/{item_id}", response_model=ChecklistItemOut)
def update_checklist(item_id: int, data: ChecklistItemUpdate, db: Session = Depends(get_db)):
    """Update a checklist item"""
    item = update_checklist_item(db, item_id, data)
    if not item:
        raise HTTPException(status_code=404, detail="Checklist item not found")
    return item

@router.patch("/checklist/{item_id}/toggle", response_model=ChecklistItemOut)
def toggle_checklist(item_id: int, db: Session = Depends(get_db)):
    """Toggle checklist item completion"""
    item = toggle_checklist_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Checklist item not found")
    return item

@router.delete("/checklist/{item_id}")
def delete_checklist(item_id: int, db: Session = Depends(get_db)):
    """Delete a checklist item"""
    if not delete_checklist_item(db, item_id):
        raise HTTPException(status_code=404, detail="Checklist item not found")
    return {"message": "Checklist item deleted successfully"}
