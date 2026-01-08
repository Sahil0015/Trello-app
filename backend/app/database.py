from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "sqlite:///./trello.db"
# You can later switch to PostgreSQL/MySQL easily

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency for DB session - moved here to avoid circular imports
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
