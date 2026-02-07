# Quick Setup Guide

## Step 1: Install Frontend Dependencies

```bash
npm install
```

## Step 2: Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

## Step 3: Start Backend Server

Open a terminal and run:
```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

## Step 4: Start Frontend

Open another terminal and run:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Optional: MongoDB Setup

If you want to use MongoDB instead of in-memory storage:

1. Install MongoDB locally or use MongoDB Atlas (cloud)
2. Create a `.env` file in the `backend` directory:
```
MONGODB_URI=mongodb://localhost:27017/popx
JWT_SECRET=your-secret-key-here
PORT=5000
```

The app will work without MongoDB using in-memory storage, but data will be lost on server restart.

## Testing the Application

1. Open `http://localhost:3000` in your browser
2. Click "Create Account" to sign up
3. Fill in the form and submit
4. You'll be redirected to the profile page
5. Logout and try logging in with your credentials

## Troubleshooting

- **Backend not connecting**: Make sure the backend server is running on port 5000
- **CORS errors**: The backend has CORS enabled, but if you still see errors, check the API URL in `src/services/authService.js`
- **MongoDB connection errors**: The app will automatically fall back to in-memory storage if MongoDB is not available
