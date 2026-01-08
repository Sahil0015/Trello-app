# Trello Clone - Full Stack Application

A Kanban-style project management application inspired by Trello, built with FastAPI (Python) backend and React frontend.

![Trello Clone](https://img.shields.io/badge/Status-Complete-green) ![Python](https://img.shields.io/badge/Python-3.8+-blue) ![React](https://img.shields.io/badge/React-18-61DAFB)

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

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- pip (Python package manager)
- npm (Node package manager)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Scaler_SWE_assessment
```

### 2. Start the Backend
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Seed database with sample data
python -m app.seed

# Start the server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at: **http://localhost:8000**

### 3. Start the Frontend (in a new terminal)
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Frontend will be available at: **http://localhost:3000**

## 📖 API Documentation

Once the backend is running, access interactive API docs:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🎨 Screenshots

The application features:
- **Board View**: Lists displayed horizontally with cards
- **Card Modal**: Full editing with labels, members, checklists
- **Drag & Drop**: Smooth card movement between lists
- **Search Bar**: Filter cards by text, labels, members

## 📝 Sample Data

After running `python -m app.seed`, you'll have:
- 1 Board: "Project Alpha"
- 4 Lists: Backlog, To Do, In Progress, Done
- 6 Sample Cards with descriptions
- 4 Labels: Bug (red), Feature (green), Urgent (orange), Documentation (blue)
- 3 Members: John Doe, Jane Smith, Bob Wilson
- Checklist items on some cards

## 🧪 Testing

### Backend API Testing
```bash
# Using Swagger UI (recommended)
# Open http://localhost:8000/docs

# Using cURL
curl http://localhost:8000/boards/1
curl http://localhost:8000/search/cards?q=bug
```

### Frontend Testing
Open http://localhost:3000 and:
1. Drag cards between lists
2. Click a card to open the modal
3. Use search/filter in the header

## 📚 Additional Documentation

- [Backend README](./backend/README.md) - Detailed API documentation
- [Frontend README](./frontend/README.md) - Component structure and design decisions

## 🔧 Configuration

### Backend (Deployed)
- **Live URL**: https://trello-backend-production.up.railway.app
- **API Docs**: https://trello-backend-production.up.railway.app/docs
- CORS: Enabled for all origins

### Frontend
- **API Base URL**: Uses deployed backend by default
- For local development, create `.env.local`:
  ```
  REACT_APP_API_URL=http://localhost:8000
  ```

## 🚀 Deployment

### Backend (Railway) ✅
Already deployed at: https://trello-backend-production.up.railway.app

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel or Netlify
3. Configure:
   - Build command: `npm run build`
   - Output directory: `build`
   - Root directory: `frontend`
4. Deploy!

## 📄 License

This project is created for educational/assessment purposes.

---

**Built with ❤️ for Scaler SWE Assessment**