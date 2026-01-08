from pydantic import BaseModel

class LabelCreate(BaseModel):
    name: str
    color: str

class LabelOut(BaseModel):
    id: int
    name: str
    color: str

    class Config:
        orm_mode = True
