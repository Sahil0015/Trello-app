from sqlalchemy.orm import Session
from app.models.label import Label
from app.schemas.label import LabelCreate

def get_labels(db: Session):
    return db.query(Label).all()

def get_label(db: Session, label_id: int):
    return db.query(Label).filter(Label.id == label_id).first()

def create_label(db: Session, data: LabelCreate):
    label = Label(name=data.name, color=data.color)
    db.add(label)
    db.commit()
    db.refresh(label)
    return label

def delete_label(db: Session, label_id: int):
    label = db.query(Label).filter(Label.id == label_id).first()
    if label:
        db.delete(label)
        db.commit()
        return True
    return False
