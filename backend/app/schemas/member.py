from pydantic import BaseModel

class MemberCreate(BaseModel):
    name: str
    email: str
    avatar_color: str = "#3498db"

class MemberOut(BaseModel):
    id: int
    name: str
    email: str
    avatar_color: str

    class Config:
        orm_mode = True
