# Task Manager App

A full-stack task management application built with React and Express.

## Backend Setup

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

## Frontend Setup

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

## API Endpoints

### Tasks
- `GET /api/tasks/get_all_tasks` - Get all tasks
- `POST /api/tasks/create_task` - Create a new task
- `PUT /api/tasks/update_task/:id` - Update a task
- `DELETE /api/tasks/delete_task/:id` - Delete a task
- `PATCH /api/tasks/update_task_status/:id` - Toggle task completion status
- `POST /api/tasks/sync_tasks` - Sync tasks from frontend localStorage to backend

## Features

- Create, read, update, and delete tasks
- Filter tasks by status (all, pending, completed)
- Search tasks by title
- Sort tasks by date, priority, or alphabetically
- Carousel interface for browsing tasks
- Task priority levels (low, medium, high)
- Due date support for tasks
- Dark and light theme toggle
- **LocalStorage persistence** - Tasks are saved in browser localStorage and automatically synced with the backend
- Responsive design

## Data Persistence

The app uses browser localStorage to persist tasks across page refreshes and browser sessions. When you:
1. **First load the page** - Tasks from localStorage are loaded and synced to the backend
2. **Create/Update/Delete a task** - Changes are saved to both the backend and localStorage
3. **Restart the backend** - Tasks from localStorage are automatically restored to the backend

This means your tasks won't be lost even if you close the browser or restart the server!
