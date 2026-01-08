from sqlalchemy.orm import Session
from app.models.checklist import ChecklistItem
from app.schemas.checklist import ChecklistItemCreate, ChecklistItemUpdate

def create_checklist_item(db: Session, data: ChecklistItemCreate):
    # Auto-calculate position if not provided
    if data.position == 0:
        max_pos = db.query(ChecklistItem).filter(ChecklistItem.card_id == data.card_id).count()
        data.position = max_pos + 1
    
    item = ChecklistItem(
        text=data.text,
        card_id=data.card_id,
        position=data.position
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def get_checklist_items(db: Session, card_id: int):
    return db.query(ChecklistItem).filter(ChecklistItem.card_id == card_id).order_by(ChecklistItem.position).all()

def update_checklist_item(db: Session, item_id: int, data: ChecklistItemUpdate):
    item = db.query(ChecklistItem).filter(ChecklistItem.id == item_id).first()
    if not item:
        return None
    
    update_data = data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(item, field, value)
    
    db.commit()
    db.refresh(item)
    return item

def delete_checklist_item(db: Session, item_id: int):
    item = db.query(ChecklistItem).filter(ChecklistItem.id == item_id).first()
    if item:
        db.delete(item)
        db.commit()
        return True
    return False

def toggle_checklist_item(db: Session, item_id: int):
    item = db.query(ChecklistItem).filter(ChecklistItem.id == item_id).first()
    if item:
        item.is_completed = not item.is_completed
        db.commit()
        db.refresh(item)
        return item
    return None
