# Task Manager App

A full-stack task management application built with React and Express.js featuring an endless animated carousel for task navigation.

## Setup and Installation Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
node server.js
```

Server runs on `http://localhost:4000`

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

Application runs on `http://localhost:3000`

## API Documentation

### Task Model
```javascript
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: Date,
  priority: 'low' | 'medium' | 'high',
  dueDate: Date | null
}
```

### API Endpoints

#### GET /api/tasks
Get all tasks

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Example Task",
    "description": "Task description",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "priority": "high",
    "dueDate": "2024-01-15T00:00:00.000Z"
  }
]
```

#### POST /api/tasks
Create a new task

**Request Body:**
```json
{
  "id": 1,
  "title": "New Task",
  "description": "Task description",
  "completed": false,
  "priority": "medium",
  "dueDate": "2024-01-15T00:00:00.000Z"
}
```

**Response:** `201 Created`

#### PUT /api/tasks/:id
Update an existing task

**URL Parameter:** `id` - Task ID

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "completed": true,
  "priority": "low",
  "dueDate": "2024-01-20T00:00:00.000Z"
}
```

**Response:** `200 OK`

#### DELETE /api/tasks/:id
Delete a task

**URL Parameter:** `id` - Task ID

**Response:** `200 OK`
```json
{
  "message": "task deleted successfully"
}
```

#### PATCH /api/tasks/:id/toggle
Toggle task completion status

**URL Parameter:** `id` - Task ID

**Response:** `200 OK` - Returns updated task

## Features

### Core Features (Required)
- ✅ Create, read, update, and delete tasks
- ✅ **Endless animated carousel** - Smooth infinite scrolling with 3-copy system
- ✅ Filter tasks by status (all, pending, completed)
- ✅ Task priority levels (low, medium, high) with visual indicators
- ✅ Toggle task completion status
- ✅ Responsive design (mobile-friendly)
- ✅ Form validation and error handling

### Bonus Features (Implemented)
- ✅ Search functionality - Search tasks by title
- ✅ Sorting options - Sort by date, priority, or alphabetically
- ✅ Task due dates - Add and display due dates
- ✅ Dark/light theme toggle - Switch between themes
- ✅ LocalStorage persistence - Tasks persist across sessions

## Design Decisions and Assumptions

### Endless Carousel Implementation
The carousel uses a 3-copy system for seamless infinite scrolling:
- Three copies of the task list are rendered: [Left Copy, Center Copy, Right Copy]
- User always views the center copy
- When scrolling past edges, the carousel smoothly transitions to the adjacent copy
- After transition completes, it instantly jumps back to the equivalent position in the center copy
- This creates a truly infinite carousel without visual jumps or breaks

### Data Persistence
The app uses browser localStorage to persist tasks across page refreshes and backend restarts:
1. **First load** - Tasks from localStorage are loaded and synced to the backend
2. **CRUD operations** - Changes are saved to both backend and localStorage
3. **Backend restart** - Tasks from localStorage are automatically restored

### Assumptions
- The task list will be short enough to not cause integer overflow for task IDs
- Users will run both frontend and backend on the same machine (localhost)
- Modern browser with ES6+ support and localStorage enabled
- In-memory storage is acceptable (tasks are not persisted on backend restart without localStorage sync)

### Technical Choices
- **Vanilla CSS only** - No CSS frameworks or preprocessors as per requirements
- **No external carousel libraries** - Implemented custom carousel logic with React hooks
- **RESTful API** - Proper HTTP methods and status codes
- **Component structure** - Clean separation of concerns with reusable components

## Time Spent

- **Backend Development:** 105 minutes
  - REST API endpoints
  - Input validation middleware
  - Error handling
  - CORS configuration

- **Frontend Development:** 130 minutes
  - React components structure
  - Endless carousel implementation
  - CRUD operations and API integration
  - State management with hooks
  - Filter, search, and sort functionality

- **Styling & Polish:** 20 minutes
  - CSS styling
  - Responsive design
  - Theme toggle
  - Visual feedback and transitions

**Total Time:** ~255 minutes (~4.25 hours)

## Project Structure

```
task-manager/
├── backend/
│   ├── package.json
│   ├── server.js
│   └── middleware/
│       └── validateTask.js
├── frontend/
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskSlide.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskEditForm.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── services/
│   │   │   ├── task_util.js
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   └── App.css
│   └── vite.config.js
├── .gitignore
└── README.md
```
