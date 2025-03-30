# MERN Authentication System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

A complete authentication system built with the MERN stack (MongoDB, Express, React, Node.js) that includes user registration, login, email verification, and password reset functionality.

## 🔗 Live Demo

Check out the live application:
- Frontend: [https://mern-auth-frontend-rose.vercel.app/](https://mern-auth-frontend-rose.vercel.app/)
- Backend: Deployed on server

## 📋 Features

- **User Authentication**
  - Login/Signup with email and password
  - JWT-based authentication with HTTP-only cookies
  - Role-based access control
  
- **Security Features**
  - Password hashing with bcrypt
  - Email verification via OTP
  - Password reset functionality
  - Protected routes

- **Modern Frontend**
  - Built with React 18 and Vite
  - Responsive design with Tailwind CSS
  - Toast notifications for feedback

- **Robust Backend**
  - REST API built with Express
  - MongoDB database with Mongoose ODM
  - JWT authentication middleware

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MongoDB database
- npm or yarn

### Running the Application

#### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with the following variables:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# EMAIL=your_email_for_sending_otps
# EMAIL_PASSWORD=your_email_app_password

# Start the server
npm start
```

#### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file with:
# VITE_BACKEND_URL=http://localhost:5000

# Start the development server
npm run dev
```

## 🔍 Project Structure

```
├── client/                # React frontend
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context for state management
│   │   ├── pages/         # Application pages
│   │   └── App.jsx        # Main component with routes
│   └── package.json
│
└── server/                # Express backend
    ├── config/            # Configuration files
    ├── controllers/       # Route controllers
    ├── middleware/        # Custom middleware
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    ├── server.js          # Entry point
    └── package.json
```

## 📝 API Endpoints

| Endpoint                | Method | Description                    | Auth Required |
|-------------------------|--------|--------------------------------|---------------|
| `/api/auth/register`    | POST   | Register a new user            | No            |
| `/api/auth/login`       | POST   | User login                     | No            |
| `/api/auth/logout`      | POST   | User logout                    | Yes           |
| `/api/auth/send-verify-otp` | POST | Send email verification OTP | Yes           |
| `/api/auth/verify-email` | POST  | Verify email with OTP          | Yes           |
| `/api/auth/send-reset-otp` | POST | Send password reset OTP      | No            |
| `/api/auth/reset-password` | POST | Reset password using OTP      | No            |
| `/api/auth/is-auth`     | GET    | Check authentication status    | Yes           |
| `/api/user/data`        | GET    | Get user data                  | Yes           |

## 🛠️ Technologies Used

### Frontend
- React 18
- React Router v7
- Axios for API requests
- TailwindCSS for styling
- React Toastify for notifications
- Vite as build tool

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Nodemailer for sending emails

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
