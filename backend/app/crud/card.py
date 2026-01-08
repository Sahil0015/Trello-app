from sqlalchemy.orm import Session
from app.models.card import Card
from app.models.label import Label
from app.models.member import Member
from app.schemas.card import CardCreate, CardUpdate

def create_card(db: Session, data: CardCreate):
    # Auto-calculate position if not provided
    if data.position == 0:
        max_pos = db.query(Card).filter(Card.list_id == data.list_id).count()
        data.position = max_pos + 1
    
    card = Card(
        title=data.title,
        description=data.description or "",
        list_id=data.list_id,
        position=data.position,
        due_date=data.due_date
    )
    db.add(card)
    db.commit()
    db.refresh(card)
    return card

def get_card(db: Session, card_id: int):
    return db.query(Card).filter(Card.id == card_id).first()

def update_card(db: Session, card_id: int, data: CardUpdate):
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        return None

    update_data = data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(card, field, value)

    db.commit()
    db.refresh(card)
    return card

def delete_card(db: Session, card_id: int):
    card = db.query(Card).filter(Card.id == card_id).first()
    if card:
        db.delete(card)
        db.commit()
        return True
    return False

def archive_card(db: Session, card_id: int, archived: bool = True):
    card = db.query(Card).filter(Card.id == card_id).first()
    if card:
        card.archived = archived
        db.commit()
        db.refresh(card)
        return card
    return None

def move_card(db: Session, card_id: int, new_list_id: int, new_position: int):
    """Move a card to a new list and/or position"""
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        return None
    
    old_list_id = card.list_id
    old_position = card.position
    
    # If moving within the same list
    if old_list_id == new_list_id:
        if new_position > old_position:
            db.query(Card).filter(
                Card.list_id == old_list_id,
                Card.position > old_position,
                Card.position <= new_position
            ).update({Card.position: Card.position - 1})
        else:
            db.query(Card).filter(
                Card.list_id == old_list_id,
                Card.position >= new_position,
                Card.position < old_position
            ).update({Card.position: Card.position + 1})
    else:
        # Moving to a different list
        # Decrease positions in old list
        db.query(Card).filter(
            Card.list_id == old_list_id,
            Card.position > old_position
        ).update({Card.position: Card.position - 1})
        
        # Increase positions in new list
        db.query(Card).filter(
            Card.list_id == new_list_id,
            Card.position >= new_position
        ).update({Card.position: Card.position + 1})
    
    card.list_id = new_list_id
    card.position = new_position
    db.commit()
    db.refresh(card)
    return card

# Label management for cards
def add_label_to_card(db: Session, card_id: int, label_id: int):
    card = db.query(Card).filter(Card.id == card_id).first()
    label = db.query(Label).filter(Label.id == label_id).first()
    if card and label:
        if label not in card.labels:
            card.labels.append(label)
            db.commit()
            db.refresh(card)
        return card
    return None

def remove_label_from_card(db: Session, card_id: int, label_id: int):
    card = db.query(Card).filter(Card.id == card_id).first()
    label = db.query(Label).filter(Label.id == label_id).first()
    if card and label:
        if label in card.labels:
            card.labels.remove(label)
            db.commit()
            db.refresh(card)
        return card
    return None

# Member management for cards
def add_member_to_card(db: Session, card_id: int, member_id: int):
    card = db.query(Card).filter(Card.id == card_id).first()
    member = db.query(Member).filter(Member.id == member_id).first()
    if card and member:
        if member not in card.members:
            card.members.append(member)
            db.commit()
            db.refresh(card)
        return card
    return None

def remove_member_from_card(db: Session, card_id: int, member_id: int):
    card = db.query(Card).filter(Card.id == card_id).first()
    member = db.query(Member).filter(Member.id == member_id).first()
    if card and member:
        if member in card.members:
            card.members.remove(member)
            db.commit()
            db.refresh(card)
        return card
    return None
