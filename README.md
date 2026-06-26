# Real-Time Chat Application

A full-stack MERN real-time chat application where users can create an account, log in, view other users, and send private messages in real time.

The app uses Socket.IO for live messaging and online user status, JWT cookies for authentication, MongoDB for storing users/conversations/messages, and React for the frontend UI.

## Live Demo

[View Live App](https://texting-app-mern-4.onrender.com/)

Note: This app is hosted on Render's free plan, so the first load may take a few seconds if the server was inactive.

## Features

- User signup and login
- JWT authentication with cookies
- Protected chat routes
- Real-time private messaging with Socket.IO
- Online user indicator
- Conversation sidebar
- Search users by name
- Message sound notification
- Auto-scroll to the latest message
- Responsive chat UI
- MongoDB database for users, conversations, and messages
- Production setup for Render deployment

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Zustand
- Socket.IO Client
- Tailwind CSS
- DaisyUI
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- Cookie Parser
- bcrypt

## Project Structure

```txt
Chatapplicationproject/
|-- backend/
|   |-- controllers/
|   |-- db/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- socket/
|   |-- utils/
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- utils/
|   |   `-- zustand/
|   `-- vite.config.js
|-- package.json
`-- README.md
```

## Environment Variables

Create a `.env` file in the project root.

```env
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

Do not push your `.env` file to GitHub.

## Run Locally

### 1. Install backend dependencies

```bash
npm install
```

### 2. Install frontend dependencies

```bash
npm install --prefix frontend
```

### 3. Start the backend

```bash
npm run server
```

The backend runs on:

```txt
http://localhost:5000
```

### 4. Start the frontend

Open another terminal and run:

```bash
npm run dev --prefix frontend
```

The frontend runs on:

```txt
http://localhost:5173
```

## API Routes

### Auth

```txt
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
```

### Users

```txt
GET /api/users
```

### Messages

```txt
GET  /api/messages/:id
POST /api/messages/send/:id
```

## Deployment

This project is configured so the Express backend can serve the production React build.

For Render, use:

### Build Command

```bash
npm run build
```

### Start Command

```bash
npm start
```

Add these environment variables in Render:

```txt
MONGO_DB_URI
JWT_SECRET
NODE_ENV=production
```

Render automatically provides the `PORT`.

## How It Works

- A user signs up or logs in.
- The backend creates a JWT token and stores it in a cookie.
- Protected routes verify the cookie before returning users or messages.
- When a user logs in, the frontend connects to Socket.IO.
- The server tracks online users with their socket IDs.
- When a message is sent, it is saved in MongoDB and emitted to the receiver in real time.

## Future Improvements

- Add typing indicator
- Add message seen/read status
- Add image and file sharing
- Add group chats
- Add profile update feature
- Add password reset
- Improve mobile layout

## Author

Created by Tilok.
