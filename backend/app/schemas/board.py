from pydantic import BaseModel
from typing import List
from .list import ListOut

class BoardCreate(BaseModel):
    title: str

class BoardOut(BaseModel):
    id: int
    title: str
    lists: List[ListOut] = []

    class Config:
        orm_mode = True
