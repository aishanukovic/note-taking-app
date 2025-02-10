# Noted. A Note-Taking App

## Overview
A simple and modern note-taking application that allows users to create, edit, delete, and search through their notes. Users can securely log in to manage their personal notes, and the app features a search bar to easily find notes by keyword.

## Features
- User authentication (login and registration)
- Create, edit, and delete notes
- Search notes by title and content
- Responsive design with a clean user interface
- Built with MongoDB for storing user data and notes

## Technologies Used
- **Frontend**: HTML, CSS (Bootstrap), JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js (if you're using Passport for authentication)
- **Deployment**: Local development

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB installed locally or a cloud MongoDB service (such as MongoDB Atlas)

### Steps
1. Clone the repository:
   git clone https://github.com/your-username/note-taking-app.git
2. Navigate to the project directory:
    cd note-taking-app
3. Install the dependencies:
    npm install
4. Create a .env file in the root of your project and add the following (replace the placeholders):
    MONGO_URI=mongodb://localhost:27017/noteApp
    SESSION_SECRET=your-secret-key
5. Run the app in development mode:
    npm start
6. Visit the app in your browser at:
    http://localhost:5050

## Usage
- Home: View a list of your notes and access the search feature to find specific notes.
- Create Note: Add a new note by filling out the title and content fields.
- Search: Use the search bar to find notes by keyword (searching both title and content).
- Account: Login or register to securely manage your notes.

## Routes
- GET /: Home page that lists all notes
- GET /notes/create: Page to create a new note
- GET /notes/:id: View a specific note by its ID
- POST /notes/create: Create a new note
- GET /search: Search for notes by keyword