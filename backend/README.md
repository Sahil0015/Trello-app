# Trello Clone - Backend API

A FastAPI-based REST API for a Kanban-style project management application.

## Tech Stack

- **Framework**: FastAPI (Python 3.8+)
- **Database**: SQLite (easily switchable to PostgreSQL/MySQL)
- **ORM**: SQLAlchemy
- **Validation**: Pydantic

## Features

- ✅ Board Management (Create, Read, Delete)
- ✅ Lists Management (Create, Edit, Delete, Reorder)
- ✅ Cards Management (Create, Edit, Delete, Archive, Move)
- ✅ Drag & Drop Support (Cards between lists)
- ✅ Labels (Create, Assign to cards, Remove)
- ✅ Members (Create, Assign to cards)
- ✅ Checklists (Add items, Toggle completion, Delete)
- ✅ Due Dates on Cards
- ✅ Search & Filter (By title, label, member, due date)

## Project Structure

```
backend/
├── app/
│   ├── api/                    # API route handlers
│   │   ├── __init__.py
│   │   ├── boards.py           # Board endpoints
│   │   ├── lists.py            # List endpoints
│   │   ├── cards.py            # Card endpoints (+ labels, members, checklist)
│   │   ├── labels.py           # Label endpoints
│   │   ├── members.py          # Member endpoints
│   │   └── search.py           # Search/filter endpoints
│   │
│   ├── crud/                   # Database CRUD operations
│   │   ├── __init__.py
│   │   ├── board.py
│   │   ├── list.py
│   │   ├── card.py
│   │   ├── label.py
│   │   └── checklist.py
│   │
│   ├── models/                 # SQLAlchemy ORM models
│   │   ├── __init__.py
│   │   ├── board.py
│   │   ├── list.py
│   │   ├── card.py
│   │   ├── label.py
│   │   ├── member.py
│   │   └── checklist.py
│   │
│   ├── schemas/                # Pydantic schemas (request/response)
│   │   ├── __init__.py
│   │   ├── board.py
│   │   ├── list.py
│   │   ├── card.py
│   │   ├── label.py
│   │   ├── member.py
│   │   └── checklist.py
│   │
│   ├── services/               # Business logic
│   │   └── drag_drop.py
│   │
│   ├── config.py               # Configuration settings
│   ├── database.py             # Database connection & session
│   ├── main.py                 # FastAPI app entry point
│   └── seed.py                 # Sample data seeder
│
├── requirements.txt            # Python dependencies
├── trello.db                   # SQLite database (auto-created)
└── README.md                   # This file
```

## Setup Instructions

### 1. Navigate to backend folder
```bash
cd backend
```

### 2. Create a virtual environment (recommended)
```bash
python -m venv venv
```

### 3. Activate virtual environment
**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Install dependencies
```bash
pip install -r requirements.txt
```

### 5. Seed the database (optional - adds sample data)
```bash
python -m app.seed
```

### 6. Run the server
```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, access the interactive API docs:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Boards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /boards/ | List all boards |
| POST | /boards/ | Create a new board |
| GET | /boards/{id} | Get board with lists and cards |
| DELETE | /boards/{id} | Delete a board |

### Lists
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /lists/ | Create a new list |
| GET | /lists/{id} | Get a specific list |
| PATCH | /lists/{id} | Update list title/position |
| DELETE | /lists/{id} | Delete a list |
| PATCH | /lists/{id}/move | Reorder list (drag & drop) |

### Cards
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /cards/ | Create a new card |
| GET | /cards/{id} | Get card details |
| PATCH | /cards/{id} | Update card |
| DELETE | /cards/{id} | Delete a card |
| PATCH | /cards/{id}/move | Move card (drag & drop) |
| PATCH | /cards/{id}/archive | Archive a card |
| PATCH | /cards/{id}/unarchive | Unarchive a card |

### Card Labels
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /cards/{id}/labels/{label_id} | Add label to card |
| DELETE | /cards/{id}/labels/{label_id} | Remove label from card |

### Card Members
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /cards/{id}/members/{member_id} | Assign member |
| DELETE | /cards/{id}/members/{member_id} | Remove member |

### Card Checklist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /cards/{id}/checklist | Get checklist items |
| POST | /cards/{id}/checklist | Add checklist item |
| PATCH | /cards/checklist/{item_id} | Update item |
| PATCH | /cards/checklist/{item_id}/toggle | Toggle completion |
| DELETE | /cards/checklist/{item_id} | Delete item |

### Labels
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /labels/ | List all labels |
| POST | /labels/ | Create a label |
| DELETE | /labels/{id} | Delete a label |

### Members
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /members/ | List all members |
| POST | /members/ | Create a member |
| DELETE | /members/{id} | Delete a member |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /search/cards | Search/filter cards |

**Search Parameters:**
- `q` - Search by title
- `label_id` - Filter by label
- `member_id` - Filter by member
- `due_before` - Filter by due date (before)
- `due_after` - Filter by due date (after)
- `archived` - Include archived cards

## Database Schema

```
boards
├── id (PK)
└── title

lists
├── id (PK)
├── title
├── position
└── board_id (FK → boards)

cards
├── id (PK)
├── title
├── description
├── position
├── due_date
├── archived
└── list_id (FK → lists)

labels
├── id (PK)
├── name
└── color

members
├── id (PK)
├── name
├── email
└── avatar_color

card_labels (junction table)
├── card_id (FK → cards)
└── label_id (FK → labels)

card_members (junction table)
├── card_id (FK → cards)
└── member_id (FK → members)

checklist_items
├── id (PK)
├── text
├── is_completed
├── position
└── card_id (FK → cards)
```

## Testing the API

You can test the API using:
1. **Swagger UI** at http://localhost:8000/docs (recommended)
2. **cURL** commands
3. **Postman** or similar tools

### Example cURL Commands

```bash
# Get all boards
curl http://localhost:8000/boards/

# Create a board
curl -X POST http://localhost:8000/boards/ \
  -H "Content-Type: application/json" \
  -d '{"title": "My Board"}'

# Get a board with lists and cards
curl http://localhost:8000/boards/1

# Create a list
curl -X POST http://localhost:8000/lists/ \
  -H "Content-Type: application/json" \
  -d '{"title": "To Do", "board_id": 1}'

# Create a card
curl -X POST http://localhost:8000/cards/ \
  -H "Content-Type: application/json" \
  -d '{"title": "My Task", "list_id": 1}'

# Move a card
curl -X PATCH http://localhost:8000/cards/1/move \
  -H "Content-Type: application/json" \
  -d '{"list_id": 2, "position": 1}'

# Search cards
curl "http://localhost:8000/search/cards?q=task&label_id=1"
```
