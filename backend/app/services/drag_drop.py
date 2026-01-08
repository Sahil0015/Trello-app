"""
Drag and Drop Service
Helper functions for reordering lists and cards
"""

from sqlalchemy.orm import Session
from app.models.list import List
from app.models.card import Card


def reorder_list_in_board(db: Session, board_id: int, list_id: int, new_position: int):
    """
    Reorder a list within a board.
    Updates positions of all affected lists.
    """
    target_list = db.query(List).filter(List.id == list_id).first()
    if not target_list or target_list.board_id != board_id:
        return None
    
    old_position = target_list.position
    
    if new_position == old_position:
        return target_list
    
    if new_position > old_position:
        # Moving down: decrease position of items between old and new
        db.query(List).filter(
            List.board_id == board_id,
            List.position > old_position,
            List.position <= new_position
        ).update({List.position: List.position - 1}, synchronize_session=False)
    else:
        # Moving up: increase position of items between new and old
        db.query(List).filter(
            List.board_id == board_id,
            List.position >= new_position,
            List.position < old_position
        ).update({List.position: List.position + 1}, synchronize_session=False)
    
    target_list.position = new_position
    db.commit()
    db.refresh(target_list)
    return target_list


def move_card_within_list(db: Session, card_id: int, new_position: int):
    """
    Move a card within the same list.
    """
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        return None
    
    old_position = card.position
    list_id = card.list_id
    
    if new_position == old_position:
        return card
    
    if new_position > old_position:
        db.query(Card).filter(
            Card.list_id == list_id,
            Card.position > old_position,
            Card.position <= new_position
        ).update({Card.position: Card.position - 1}, synchronize_session=False)
    else:
        db.query(Card).filter(
            Card.list_id == list_id,
            Card.position >= new_position,
            Card.position < old_position
        ).update({Card.position: Card.position + 1}, synchronize_session=False)
    
    card.position = new_position
    db.commit()
    db.refresh(card)
    return card


def move_card_to_list(db: Session, card_id: int, new_list_id: int, new_position: int):
    """
    Move a card to a different list at a specific position.
    """
    card = db.query(Card).filter(Card.id == card_id).first()
    if not card:
        return None
    
    old_list_id = card.list_id
    old_position = card.position
    
    # If same list, use within-list movement
    if old_list_id == new_list_id:
        return move_card_within_list(db, card_id, new_position)
    
    # Decrease positions in old list for cards after this one
    db.query(Card).filter(
        Card.list_id == old_list_id,
        Card.position > old_position
    ).update({Card.position: Card.position - 1}, synchronize_session=False)
    
    # Increase positions in new list for cards at or after new position
    db.query(Card).filter(
        Card.list_id == new_list_id,
        Card.position >= new_position
    ).update({Card.position: Card.position + 1}, synchronize_session=False)
    
    # Move the card
    card.list_id = new_list_id
    card.position = new_position
    db.commit()
    db.refresh(card)
    return card
