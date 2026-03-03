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

## Features

- Create, read, update, and delete tasks
- Filter tasks by status (all, pending, completed)
- Carousel interface for browsing tasks
- Task priority levels (low, medium, high)
- Responsive design
