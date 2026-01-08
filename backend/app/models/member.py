from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

# Association table for card-member many-to-many relationship
card_members = Table(
    "card_members",
    Base.metadata,
    Column("card_id", ForeignKey("cards.id"), primary_key=True),
    Column("member_id", ForeignKey("members.id"), primary_key=True),
)

class Member(Base):
    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    avatar_color = Column(String, default="#3498db")  # Color for avatar display

    cards = relationship("Card", secondary=card_members, back_populates="members")
