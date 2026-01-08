from sqlalchemy.orm import Session
from app.models.list import List
from app.schemas.list import ListCreate, ListUpdate

def create_list(db: Session, data: ListCreate):
    # Auto-calculate position if not provided
    if data.position == 0:
        max_pos = db.query(List).filter(List.board_id == data.board_id).count()
        data.position = max_pos + 1
    
    db_list = List(
        title=data.title,
        board_id=data.board_id,
        position=data.position
    )
    db.add(db_list)
    db.commit()
    db.refresh(db_list)
    return db_list

def get_list(db: Session, list_id: int):
    return db.query(List).filter(List.id == list_id).first()

def update_list(db: Session, list_id: int, data: ListUpdate):
    db_list = db.query(List).filter(List.id == list_id).first()
    if not db_list:
        return None
    
    if data.title is not None:
        db_list.title = data.title
    if data.position is not None:
        db_list.position = data.position
    
    db.commit()
    db.refresh(db_list)
    return db_list

def delete_list(db: Session, list_id: int):
    db_list = db.query(List).filter(List.id == list_id).first()
    if db_list:
        db.delete(db_list)
        db.commit()
        return True
    return False

def reorder_lists(db: Session, board_id: int, list_id: int, new_position: int):
    """Reorder a list within a board"""
    target_list = db.query(List).filter(List.id == list_id).first()
    if not target_list:
        return None
    
    old_position = target_list.position
    
    if new_position > old_position:
        # Moving down: decrease position of items between old and new
        db.query(List).filter(
            List.board_id == board_id,
            List.position > old_position,
            List.position <= new_position
        ).update({List.position: List.position - 1})
    else:
        # Moving up: increase position of items between new and old
        db.query(List).filter(
            List.board_id == board_id,
            List.position >= new_position,
            List.position < old_position
        ).update({List.position: List.position + 1})
    
    target_list.position = new_position
    db.commit()
    db.refresh(target_list)
    return target_list
