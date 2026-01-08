from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class ChecklistItem(Base):
    __tablename__ = "checklist_items"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    is_completed = Column(Boolean, default=False)
    position = Column(Integer, nullable=False)

    card_id = Column(Integer, ForeignKey("cards.id"))

    card = relationship("Card", back_populates="checklist_items")
