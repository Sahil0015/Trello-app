from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.api import boards, lists, cards, labels, search, members

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Trello Clone API", version="1.0.0")

# CORS (needed for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(boards.router)
app.include_router(lists.router)
app.include_router(cards.router)
app.include_router(labels.router)
app.include_router(search.router)
app.include_router(members.router)

@app.get("/")
def root():
    return {"message": "Trello Clone API is running!"}
