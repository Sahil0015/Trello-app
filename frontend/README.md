# Trello Clone - Frontend

A React-based Kanban board application with drag-and-drop functionality.

## Tech Stack

- **Framework**: React 18 (Functional Components + Hooks only)
- **HTTP Client**: Axios
- **Drag & Drop**: @dnd-kit
- **Styling**: Plain CSS (Trello-inspired design)

## Features

- ✅ View board with lists and cards
- ✅ Create, edit, and delete lists
- ✅ Create, edit, and delete cards
- ✅ Drag and drop cards between lists
- ✅ Card details modal with:
  - Title and description editing
  - Labels (colored tags)
  - Due dates with visual indicators
  - Checklists with progress tracking
  - Member assignment with avatars
- ✅ Search cards by title/description
- ✅ Filter by labels and members

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm (comes with Node.js)
- Backend running at `http://localhost:8000`

### 1. Navigate to frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm start
```

The app will run at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html              # HTML entry point
│
├── src/
│   ├── api/                    # Axios instance and API functions
│   │   ├── axios.js            # Configured axios instance (baseURL: localhost:8000)
│   │   ├── boards.js           # Board API calls + search
│   │   ├── lists.js            # List CRUD operations
│   │   └── cards.js            # Card operations + labels/members/checklist
│   │
│   ├── components/             # React components
│   │   ├── board/              # Board-level components
│   │   │   ├── Board.jsx       # Main board with DnD context
│   │   │   └── BoardHeader.jsx # Header with search/filter controls
│   │   │
│   │   ├── card/               # Card components
│   │   │   ├── Card.jsx        # Card display with labels/badges
│   │   │   ├── CardLabels.jsx  # Label color bars
│   │   │   └── CardModal.jsx   # Full card editing modal
│   │   │
│   │   ├── common/             # Reusable components
│   │   │   ├── Button.jsx      # Styled button component
│   │   │   └── Modal.jsx       # Modal overlay component
│   │   │
│   │   └── list/               # List components
│   │       ├── AddList.jsx     # Add new list form
│   │       ├── List.jsx        # List with cards container
│   │       └── ListHeader.jsx  # Editable list title + menu
│   │
│   ├── dnd/                    # Drag and drop (isolated)
│   │   ├── DndProvider.jsx     # DnD context provider (@dnd-kit)
│   │   └── SortableCard.jsx    # Draggable card wrapper
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useBoard.js         # Board data fetching hook
│   │
│   ├── pages/                  # Page components
│   │   └── BoardPage.jsx       # Main board page (uses boardId = 1)
│   │
│   ├── styles/                 # CSS styles
│   │   └── globals.css         # All styling (Trello-inspired)
│   │
│   ├── App.jsx                 # Root component
│   └── index.js                # React entry point
│
├── package.json                # Dependencies and scripts
├── jsconfig.json               # JS configuration
└── README.md                   # This file
```

## How It Works

### Data Flow
1. **App.jsx** renders **BoardPage**
2. **BoardPage** uses the **useBoard** hook to fetch board data from API
3. **Board** component displays lists using **DndProvider** for drag-and-drop
4. **List** components render cards wrapped in **SortableCard**
5. Clicking a **Card** opens **CardModal** for editing

### Drag and Drop
- Uses `@dnd-kit` library for accessible drag-and-drop
- Cards can be dragged between lists
- Drop position determines new card order
- API call updates card's list_id and position

### Search & Filter
- Search input filters cards by title/description
- Label dropdown filters by assigned label
- Member dropdown filters by assigned member
- Matching cards are highlighted

## Key Design Decisions

| Decision | Reason |
|----------|--------|
| **No Context/Reducers** | Uses prop drilling and useState for simplicity (beginner-friendly) |
| **Hardcoded Board ID** | Uses boardId = 1 from seed data (single-board demo) |
| **Isolated DnD** | All drag-drop logic lives in `/dnd` folder for clarity |
| **API Abstraction** | All API calls go through `/api` files (easy to modify) |
| **Functional Components** | Modern React with hooks only (no class components) |
| **Plain CSS** | No CSS frameworks, easy to understand and customize |

## Available Scripts

```bash
npm start       # Start development server (port 3000)
npm run build   # Create production build
npm test        # Run tests
```

## Customization

### Change API URL
Set the environment variable `REACT_APP_API_URL` or edit `src/api/axios.js`:
```javascript
// Default: https://trello-backend-production.up.railway.app
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://trello-backend-production.up.railway.app';
```

For local development, create a `.env.local` file:
```
REACT_APP_API_URL=http://localhost:8000
```

### Change Default Board
Edit `src/pages/BoardPage.jsx`:
```javascript
const BOARD_ID = 1;  // Change to your board ID
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Cards not loading | Check if backend is accessible (deployed or local) |
| Drag not working | Refresh the page, check browser console |
| Search not working | Click "Search" button after entering filters |
| CORS errors | Backend should have CORS enabled for your frontend domain |

## Deployment

### Backend (Already Deployed)
- **URL**: https://trello-backend-production.up.railway.app
- **Docs**: https://trello-backend-production.up.railway.app/docs

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `build`
5. (Optional) Set env variable: `REACT_APP_API_URL=https://trello-backend-production.up.railway.app`
