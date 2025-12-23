# beyondchats
Full-stack Laravel + React dashboard for browsing and reviewing rewritten articles from a REST API.
=======
# Article Rewriter Dashboard

A full-stack application designed to provide a simple and clean interface for browsing articles. The backend is a Laravel API that serves article data, and the frontend is a React-based dashboard that displays it.

## Tech Stack

-   **Backend:** Laravel (PHP) with SQLite
-   **Frontend:** React, TypeScript, Vite

## Features

### Backend (`laravel-api`)

-   RESTful API for article management.
-   `Article` model with fields for original and rewritten content, and references.
-   Database seeding to populate the application with initial data.
-   Endpoints:
    -   `GET /api/articles`: Fetches a list of all articles.
    -   `GET /api/articles/{id}`: Retrieves a single article by its ID.
    -   `POST /api/articles`: Creates a new article (requires `title` and `original_content`).

### Frontend (`react-ui`)

-   A two-panel dashboard layout.
-   **Left Sidebar:** Displays a list of all article titles, sorted with the newest first.
-   **Right Panel:** Shows the details of the selected article, including:
    -   Title
    -   Original content
    -   Rewritten content (with a fallback message if not available).
    -   A list of clickable reference links.
-   Handles loading, error, and empty states gracefully.

## Folder Structure

The project is organized into two main directories:

-   `laravel-api/`: Contains the entire Laravel backend application, including the API controllers, models, and database configuration.
-   `react-ui/`: Contains the React and TypeScript frontend application, built with Vite.

## Prerequisites

Ensure you have the following installed on your local machine:

-   PHP (>= 8.1)
-   Composer
-   Node.js (>= 18.x)
-   npm

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Backend Setup (Laravel API)

```bash
# Navigate to the backend directory
cd laravel-api

# Install PHP dependencies
composer install

# Create the environment file from the example
cp .env.example .env

# Create an empty SQLite database file
touch database/database.sqlite

# IMPORTANT: Update the .env file to use an absolute path for your SQLite database.
# Find the DB_DATABASE line and set it to the full path of the file you just created.
# For example:
# DB_CONNECTION=sqlite
# DB_DATABASE=C:\Users\YourUser\path\to\project\laravel-api\database\database.sqlite

# Run database migrations and seed it with initial data
php artisan migrate --seed

# Start the Laravel development server
php artisan serve
```

The backend API will now be running at `http://127.0.0.1:8000`.

### 3. Frontend Setup (React UI)

```bash
# Navigate to the frontend directory from the root
cd react-ui

# Install JavaScript dependencies
npm install

# Start the Vite development server
npm run dev
```

The frontend application will now be running at `http://localhost:5173`.

## How to Use

1.  **API:** You can access the raw article data by navigating to `http://127.0.0.1:8000/api/articles` in your browser or API client.
2.  **Dashboard:** Open `http://localhost:5173` in your browser. The dashboard will load the articles from the API. Click on any article title in the left sidebar to view its complete details in the right panel.

## Future Improvements

This project serves as a solid foundation. Here are some potential features for future development:

-   **AI Integration:** Connect to a real AI service (like OpenAI's GPT) to generate the `rewritten_content` for an article.
-   **User Authentication:** Add user registration and login to protect routes and associate articles with users.
-   **CRUD Operations:** Implement full Create, Read, Update, and Delete functionality from the frontend dashboard.
-   **Search and Filtering:** Add a search bar to filter articles by title or content.
-   **Responsive Design:** Enhance the CSS to ensure the dashboard is usable on various screen sizes.
