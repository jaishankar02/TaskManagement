# Task Management System API

## Overview

This Task Management System API allows users to manage tasks, including creating, reading, updating, and deleting tasks. The system supports user registration, authentication with JWT, role-based access control, task assignment, and advanced task filtering and search functionalities.

## Features

- **User Registration and Authentication**: Users can register, log in, and receive a JWT token for authenticated requests.
- **Task Management**: Users can create, view, update, and delete tasks.
- **Task Assignment**: Tasks can be assigned to users.
- **Filtering**: Tasks can be filtered based on status, priority, and due date.
- **Search**: Tasks can be searched by title or description.
- **Role-Based Access Control**: Supports different user roles (e.g., admin, user) with varying permissions.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for handling HTTP requests.
- **Sequelize ORM**: ORM for MySQL database operations.
- **MySQL**: Relational database management system.
- **JWT**: JSON Web Token for authentication.
- **Docker**: Containerization for the application.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **MySQL**: Ensure that MySQL is installed and running.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/task-management-api.git
    cd task-management-api
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create a `.env` file**:
    Create a `.env` file in the root directory of the project with the following content:
    ```env
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database_name
    JWT_SECRET=your_jwt_secret
    ```

4. **Set up the database**:
    - Make sure your MySQL server is running.
    - Create the database:
    ```sql
    CREATE DATABASE taskmanagement;
    ```
### Running the Application

1. **Start the server**:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:8000`.