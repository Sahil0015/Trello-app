# Trello Clone - Full Stack Application

A Kanban-style project management application inspired by Trello, built with FastAPI (Python) backend and React frontend.

![Trello Clone](https://img.shields.io/badge/Status-Complete-green) ![Python](https://img.shields.io/badge/Python-3.8+-blue) ![React](https://img.shields.io/badge/React-18-61DAFB)

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [https://trello-app-iota.vercel.app](https://trello-app-iota.vercel.app) |
| **Backend API** | [https://trello-backend-production.up.railway.app](https://trello-backend-production.up.railway.app) |
| **API Docs** | [https://trello-backend-production.up.railway.app/docs](https://trello-backend-production.up.railway.app/docs) |

## 🎯 Features

### Board Management
- Create and view Kanban boards
- Multiple lists per board
- Drag and drop cards between lists

### Card Features
- Create, edit, and delete cards
- Rich card details with description
- Due dates with visual indicators (overdue/due soon)
- Colored labels for categorization
- Member assignment with avatars
- Checklists with progress tracking

### Search & Filter
- Full-text search across cards
- Filter by labels
- Filter by assigned members

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, @dnd-kit, Axios |
| **Backend** | FastAPI, SQLAlchemy, Pydantic |
| **Database** | SQLite (easily switchable) |
| **Styling** | Plain CSS (Trello-inspired) |

## 📁 Project Structure

```
Scaler_SWE_assessment/
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── api/            # API route handlers
│   │   ├── crud/           # Database operations
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── services/       # Business logic
│   │   ├── main.py         # FastAPI app entry
│   │   ├── database.py     # DB connection
│   │   └── seed.py         # Sample data
│   └── requirements.txt
│
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── api/            # API service functions
│   │   ├── components/     # React components
│   │   ├── dnd/            # Drag-and-drop logic
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   └── styles/         # CSS styles
│   └── package.json
│
├── Assignment.txt           # Project requirements
└── README.md               # This file
```

## 🚀 Getting Started

Simply visit the live demo: **https://trello-app-iota.vercel.app**

The application comes pre-loaded with sample data including boards, lists, cards, labels, and members. You can immediately start:
- Dragging cards between lists
- Creating new lists and cards
- Editing card details, labels, and members
- Searching and filtering cards

## 📖 API Documentation

Access the interactive API documentation:
- **Swagger UI**: https://trello-backend-production.up.railway.app/docs
- **ReDoc**: https://trello-backend-production.up.railway.app/redoc

## 🎨 Screenshots

The application features:
- **Board View**: Lists displayed horizontally with cards
- **Card Modal**: Full editing with labels, members, checklists
- **Drag & Drop**: Smooth card movement between lists
- **Search Bar**: Filter cards by text, labels, members

## 📝 Sample Data

The deployed app comes pre-loaded with sample data:
- 1 Board: "Project Management"
- 4 Lists: To Do, In Progress, Review, Done
- 6 Sample Cards with descriptions and due dates
- 5 Labels: Bug (red), Feature (blue), Enhancement (purple), Urgent (orange), Documentation (teal)
- 3 Members: John Doe, Jane Smith, Bob Wilson
- Checklist items on some cards

## 🧪 Testing

### Try the Live App
1. Visit https://trello-app-iota.vercel.app
2. Drag cards between lists
3. Click a card to open the modal and edit details
4. Use the search bar and filters in the header
5. Create new labels and members from the card modal

### API Testing
```bash
# Using Swagger UI (recommended)
# Open https://trello-backend-production.up.railway.app/docs

# Using cURL
curl https://trello-backend-production.up.railway.app/boards/1
curl https://trello-backend-production.up.railway.app/search/cards?q=bug
```

## 📚 Additional Documentation

- [Backend README](./backend/README.md) - Detailed API documentation
- [Frontend README](./frontend/README.md) - Component structure and design decisions

## 🔧 Local Development

To run the application locally:

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install

# Create .env.local to use local backend
echo REACT_APP_API_URL=http://localhost:8000 > .env.local

npm start
```

## 🚀 Deployment

### Backend (Railway) ✅
- **Live URL**: https://trello-backend-production.up.railway.app
- **API Docs**: https://trello-backend-production.up.railway.app/docs
- Auto-seeds sample data on fresh deployment

### Frontend (Vercel) ✅
- **Live URL**: https://trello-app-iota.vercel.app
- Connected to Railway backend
- Auto-deploys on push to main branch

## 📄 License

This project is created for educational/assessment purposes.

---