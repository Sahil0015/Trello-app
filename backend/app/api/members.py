from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.member import MemberOut, MemberCreate
from app.crud.member import get_members, get_member, create_member, delete_member
from app.database import get_db

router = APIRouter(prefix="/members", tags=["members"])

@router.get("/", response_model=List[MemberOut])
def list_members(db: Session = Depends(get_db)):
    """Get all members"""
    return get_members(db)

@router.get("/{member_id}", response_model=MemberOut)
def read_member(member_id: int, db: Session = Depends(get_db)):
    """Get a specific member"""
    member = get_member(db, member_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member

@router.post("/", response_model=MemberOut)
def create(data: MemberCreate, db: Session = Depends(get_db)):
    """Create a new member"""
    return create_member(db, data)

@router.delete("/{member_id}")
def delete(member_id: int, db: Session = Depends(get_db)):
    """Delete a member"""
    if not delete_member(db, member_id):
        raise HTTPException(status_code=404, detail="Member not found")
    return {"message": "Member deleted successfully"}
