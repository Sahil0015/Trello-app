from pydantic import BaseModel
from typing import List, Optional
from .card import CardOut

class ListBase(BaseModel):
    title: str

class ListCreate(ListBase):
    board_id: int
    position: int = 0

class ListUpdate(BaseModel):
    title: Optional[str] = None
    position: Optional[int] = None

class ListOut(ListBase):
    id: int
    position: int
    board_id: int
    cards: List[CardOut] = []

    class Config:
        orm_mode = True

# Schema for reordering lists
class ListMove(BaseModel):
    position: int
