# PopX - Full Stack Application

A full-stack application built with React (frontend) and Node.js (backend) for the PopX assignment.

## Features

- **Landing Page**: Welcome screen with options to create account or login
- **Signup**: User registration with full name, phone, email, password, company name, and agency status
- **Login**: User authentication with email and password
- **Profile**: Account settings page displaying user information
- **Backend API**: RESTful API with signup and login endpoints
- **JWT Authentication**: Secure token-based authentication
- **Database**: MongoDB support with in-memory fallback

## Project Structure

```
educase-fronted/
├── src/                    # React frontend
│   ├── pages/             # Page components
│   │   ├── Landing.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── Profile.js
│   ├── services/          # API services
│   │   └── authService.js
│   └── App.js             # Main app component
├── backend/               # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Express server
└── package.json
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - app works with in-memory storage if MongoDB is not available)

## Installation

### Frontend Setup

1. Navigate to the project root directory
2. Install dependencies:
```bash
npm install
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (optional):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/popx
JWT_SECRET=your-secret-key-change-in-production
```

## Running the Application

### Start Backend Server

From the `backend` directory:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Start Frontend

From the project root directory:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phoneNumber": "1234567890",
  "email": "john@example.com",
  "password": "password123",
  "companyName": "Company Name",
  "isAgency": "Yes" or "No"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "fullName": "John Doe",
    "email": "john@example.com",
    ...
  }
}
```

### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "fullName": "John Doe",
    "email": "john@example.com",
    ...
  }
}
```

## Environment Variables

Create a `.env` file in the `backend` directory:

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string (optional)
- `JWT_SECRET`: Secret key for JWT tokens

## Deployment

### Frontend (Vercel/Netlify)

1. Build the React app:
```bash
npm run build
```

2. Deploy the `build` folder to Vercel or Netlify

3. Set environment variable `REACT_APP_API_URL` to your backend URL

### Backend (Heroku/Railway/Render)

1. Deploy the `backend` folder to your hosting service
2. Set environment variables in your hosting platform
3. Update frontend `REACT_APP_API_URL` to point to deployed backend

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- **Styling**: CSS3

## Notes

- The application works with or without MongoDB. If MongoDB is not available, it uses in-memory storage.
- JWT tokens are stored in localStorage for authentication.
- All passwords are hashed using bcrypt before storage.
