from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from .label import LabelOut
from .member import MemberOut
from .checklist import ChecklistItemOut

class CardBase(BaseModel):
    title: str
    description: Optional[str] = ""
    due_date: Optional[date] = None

class CardCreate(CardBase):
    list_id: int
    position: int = 0

class CardUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    list_id: Optional[int] = None
    position: Optional[int] = None
    archived: Optional[bool] = None

class CardOut(CardBase):
    id: int
    position: int
    archived: bool = False
    list_id: int
    labels: List[LabelOut] = []
    members: List[MemberOut] = []
    checklist_items: List[ChecklistItemOut] = []

    class Config:
        orm_mode = True

# Schema for moving/reordering cards
class CardMove(BaseModel):
    list_id: int
    position: int
