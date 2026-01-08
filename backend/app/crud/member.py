from sqlalchemy.orm import Session
from app.models.member import Member
from app.schemas.member import MemberCreate

def get_members(db: Session):
    return db.query(Member).all()

def get_member(db: Session, member_id: int):
    return db.query(Member).filter(Member.id == member_id).first()

def create_member(db: Session, data: MemberCreate):
    member = Member(name=data.name, email=data.email, avatar_color=data.avatar_color)
    db.add(member)
    db.commit()
    db.refresh(member)
    return member

def delete_member(db: Session, member_id: int):
    member = db.query(Member).filter(Member.id == member_id).first()
    if member:
        db.delete(member)
        db.commit()
        return True
    return False
