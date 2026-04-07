# Task Manager

A full-stack task management web app built with React, Express, and MongoDB. The project demonstrates core CRUD operations, REST API integration, state management on the frontend, and a clean responsive UI suitable for a portfolio project.

## Overview

This application allows users to:

- Add new tasks with a priority score
- View all tasks in a responsive dashboard
- Edit existing tasks
- Delete tasks
- Track task urgency through priority-based visual indicators

The frontend is designed to feel polished and presentable, making the project easier to showcase on GitHub and mention on a resume.

## Tech Stack

### Frontend

- React
- CSS
- Fetch API

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- CORS

## Features

- Full CRUD functionality for tasks
- RESTful API integration between frontend and backend
- Priority-based task sorting
- Responsive dashboard-style UI
- Inline task editing
- Error handling and empty-state messaging

## Project Structure

```text
task-manager/
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- App.js
|   |   |-- App.css
|   |   |-- index.css
|
|-- node/
|   |-- models/
|   |   |-- Tasks.js
|   |-- routes/
|   |   |-- taskRoutes.js
|   |-- server.js
```

## How It Works

- The React frontend sends HTTP requests to the Express backend.
- The Express backend exposes task routes for creating, reading, updating, and deleting tasks.
- Mongoose connects the backend to MongoDB and handles data modeling through the task schema.
- Tasks are displayed in the UI with priority labels and a cleaner card-based layout.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Fetch all tasks |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd task-manager
```

### 2. Install backend dependencies

```bash
cd node
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Start the backend server

```bash
cd ../node
npx nodemon server.js
```

Backend runs on:

```text
http://localhost:5000
```

### 5. Start the frontend

```bash
cd ../frontend
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

## Environment Variables

For production or public GitHub use, the MongoDB connection string should be stored in an environment variable instead of being hardcoded.

Suggested setup:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Then update `node/server.js` to use `process.env.MONGO_URI`.

## Resume Highlights

This project demonstrates:

- Full-stack web development using the MERN ecosystem
- REST API design and CRUD operations
- MongoDB integration using Mongoose
- Frontend state handling with React hooks
- Responsive UI design for a user-facing application

## Future Improvements

- Add task completion status
- Add authentication and user-specific task lists
- Add search and filtering
- Deploy frontend and backend
- Replace hardcoded configuration with environment variables

## Author

**Afras Ahmed Khan**

If you want, I can also help you with:

- a stronger project title
- a resume-ready project description
- `.env` cleanup before pushing to GitHub
