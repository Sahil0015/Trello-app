from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from app.models.card import Card
from app.models.label import Label, card_labels
from app.models.member import Member, card_members
from app.schemas.card import CardOut
from app.database import get_db

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/cards", response_model=List[CardOut])
def search_cards(
    q: Optional[str] = Query(None, description="Search cards by title"),
    label_id: Optional[int] = Query(None, description="Filter by label ID"),
    member_id: Optional[int] = Query(None, description="Filter by member ID"),
    due_before: Optional[date] = Query(None, description="Filter cards due before this date"),
    due_after: Optional[date] = Query(None, description="Filter cards due after this date"),
    archived: Optional[bool] = Query(False, description="Include archived cards"),
    db: Session = Depends(get_db)
):
    """
    Search and filter cards.
    - Search by title (partial match)
    - Filter by label
    - Filter by assigned member
    - Filter by due date range
    """
    query = db.query(Card)
    
    # Filter by archived status
    if not archived:
        query = query.filter(Card.archived == False)
    
    # Search by title
    if q:
        query = query.filter(Card.title.ilike(f"%{q}%"))
    
    # Filter by label
    if label_id:
        query = query.filter(Card.labels.any(Label.id == label_id))
    
    # Filter by member
    if member_id:
        query = query.filter(Card.members.any(Member.id == member_id))
    
    # Filter by due date
    if due_before:
        query = query.filter(Card.due_date <= due_before)
    
    if due_after:
        query = query.filter(Card.due_date >= due_after)
    
    return query.all()
