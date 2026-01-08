from pydantic import BaseModel
from typing import Optional

class ChecklistItemCreate(BaseModel):
    text: str
    card_id: int
    position: int = 0

class ChecklistItemUpdate(BaseModel):
    text: Optional[str] = None
    is_completed: Optional[bool] = None
    position: Optional[int] = None

class ChecklistItemOut(BaseModel):
    id: int
    text: str
    is_completed: bool
    position: int

    class Config:
        orm_mode = True
