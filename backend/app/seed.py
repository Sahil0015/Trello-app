from datetime import date, timedelta
from app.database import SessionLocal, Base, engine
from app.models.board import Board
from app.models.list import List
from app.models.card import Card
from app.models.label import Label
from app.models.member import Member
from app.models.checklist import ChecklistItem

def seed():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(Board).first():
        print("Database already seeded!")
        db.close()
        return

    # Create sample members
    members = [
        Member(name="John Doe", email="john@example.com", avatar_color="#e74c3c"),
        Member(name="Jane Smith", email="jane@example.com", avatar_color="#3498db"),
        Member(name="Bob Wilson", email="bob@example.com", avatar_color="#2ecc71"),
    ]
    db.add_all(members)
    db.commit()

    # Create sample labels
    labels = [
        Label(name="Bug", color="#e74c3c"),
        Label(name="Feature", color="#3498db"),
        Label(name="Enhancement", color="#9b59b6"),
        Label(name="Urgent", color="#e67e22"),
        Label(name="Documentation", color="#1abc9c"),
    ]
    db.add_all(labels)
    db.commit()

    # Create sample board
    board = Board(title="Project Management")
    db.add(board)
    db.commit()
    db.refresh(board)

    # Create lists
    todo = List(title="To Do", position=1, board_id=board.id)
    in_progress = List(title="In Progress", position=2, board_id=board.id)
    review = List(title="Review", position=3, board_id=board.id)
    done = List(title="Done", position=4, board_id=board.id)

    db.add_all([todo, in_progress, review, done])
    db.commit()
    db.refresh(todo)
    db.refresh(in_progress)
    db.refresh(review)
    db.refresh(done)

    # Create sample cards
    card1 = Card(
        title="Setup project structure",
        description="Initialize the project with proper folder structure and dependencies",
        position=1,
        list_id=todo.id,
        due_date=date.today() + timedelta(days=3)
    )
    
    card2 = Card(
        title="Design database schema",
        description="Create ERD and implement database models",
        position=2,
        list_id=todo.id,
        due_date=date.today() + timedelta(days=5)
    )
    
    card3 = Card(
        title="Build API endpoints",
        description="Implement REST API endpoints for all resources",
        position=1,
        list_id=in_progress.id,
        due_date=date.today() + timedelta(days=2)
    )
    
    card4 = Card(
        title="Create frontend components",
        description="Build React components for the UI",
        position=2,
        list_id=in_progress.id
    )
    
    card5 = Card(
        title="Code review",
        description="Review the pull request for feature branch",
        position=1,
        list_id=review.id,
        due_date=date.today() + timedelta(days=1)
    )
    
    card6 = Card(
        title="Project initialization",
        description="Initial project setup completed",
        position=1,
        list_id=done.id
    )

    db.add_all([card1, card2, card3, card4, card5, card6])
    db.commit()
    db.refresh(card1)
    db.refresh(card2)
    db.refresh(card3)

    # Assign labels to cards
    card1.labels.append(labels[1])  # Feature
    card2.labels.append(labels[1])  # Feature
    card2.labels.append(labels[4])  # Documentation
    card3.labels.append(labels[1])  # Feature
    card3.labels.append(labels[3])  # Urgent
    card5.labels.append(labels[2])  # Enhancement

    # Assign members to cards
    card1.members.append(members[0])  # John
    card2.members.append(members[1])  # Jane
    card3.members.append(members[0])  # John
    card3.members.append(members[2])  # Bob
    card5.members.append(members[1])  # Jane

    db.commit()

    # Create checklist items for card3
    checklist_items = [
        ChecklistItem(text="Create board endpoints", is_completed=True, position=1, card_id=card3.id),
        ChecklistItem(text="Create list endpoints", is_completed=True, position=2, card_id=card3.id),
        ChecklistItem(text="Create card endpoints", is_completed=False, position=3, card_id=card3.id),
        ChecklistItem(text="Add search functionality", is_completed=False, position=4, card_id=card3.id),
    ]
    db.add_all(checklist_items)
    db.commit()

    db.close()
    print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
