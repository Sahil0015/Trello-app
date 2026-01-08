from sqlalchemy.orm import Session
from app.models.board import Board
from app.schemas.board import BoardCreate

def create_board(db: Session, board: BoardCreate):
    db_board = Board(title=board.title)
    db.add(db_board)
    db.commit()
    db.refresh(db_board)
    return db_board

def get_board(db: Session, board_id: int):
    return db.query(Board).filter(Board.id == board_id).first()

def get_all_boards(db: Session):
    return db.query(Board).all()

def delete_board(db: Session, board_id: int):
    board = db.query(Board).filter(Board.id == board_id).first()
    if board:
        db.delete(board)
        db.commit()
        return True
    return False
