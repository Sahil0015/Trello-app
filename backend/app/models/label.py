from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

# Association table for card-label many-to-many relationship
card_labels = Table(
    "card_labels",
    Base.metadata,
    Column("card_id", ForeignKey("cards.id"), primary_key=True),
    Column("label_id", ForeignKey("labels.id"), primary_key=True),
)

class Label(Base):
    __tablename__ = "labels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    color = Column(String, nullable=False)

    cards = relationship("Card", secondary=card_labels, back_populates="labels")
