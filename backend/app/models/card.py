from sqlalchemy import Column, Integer, String, ForeignKey, Date, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, default="")
    position = Column(Integer, nullable=False)
    due_date = Column(Date, nullable=True)
    archived = Column(Boolean, default=False)

    list_id = Column(Integer, ForeignKey("lists.id"))

    list = relationship("List", back_populates="cards")
    labels = relationship("Label", secondary="card_labels", back_populates="cards")
    members = relationship("Member", secondary="card_members", back_populates="cards")
    checklist_items = relationship("ChecklistItem", back_populates="card", cascade="all, delete-orphan")
