# To-Do Application

The To-Do application is a tool that allows users to efficiently manage their personal and community tasks.

## About the Application ℹ️

The application allows users to:

- Register and authenticate using Firebase.
- Create, edit, and delete personal tasks.
- View and manage community tasks stored in a Django API and PostgreSQL.

## Application Requirements 📋

### User Registration and Authentication

- Registration with email and password.
- Login with registered credentials.

### Personal Task Management

- Creation of tasks with title and description.
- Saving in Local Storage of the browser.
- Editing pending tasks (gray).
- Deletion of completed tasks from the community.

### Community Task Management

- Viewing and manipulation of community tasks.
- Editing pending tasks (gray).
- Deletion of completed tasks.

## Technologies Used 💻

### Frontend

- Framework: React
- State Management: Redux Toolkit
- Styling: Tailwind CSS
- Authentication: Firebase

### Backend

- Framework: Django
- Database: PostgreSQL
- API: Django REST Framework

## Application Flow 🔄

### User Registration and Authentication

- Registration and login.

### Dashboard

- Display of personal and community tasks.
- Creation of new personal tasks.
- Editing and deletion of personal tasks.
- Management of community tasks.

## Development Environment Setup ⚙️

### Frontend

1. Clone the repository.
2. Install dependencies.
3. Configure environment variables for Firebase.

### Backend

- Set up and run the Django API with PostgreSQL.

## Django API for Community Tasks 📡

- **Get All Tasks:** `GET /api/tasks/`
- **Delete Task:** `DELETE /api/tasks/<task_id>/`
- **Update Task:** `UPDATE /api/tasks/<task_id>/`
- **Create Task:** `POST /api/tasks/`

## Security Considerations 🔐

- Secure authentication with Firebase.
- Secure communications between frontend and backend.
- Additional security measures on the backend (CSRF, SQL Injection).
#   t o - d o - a p p  
 