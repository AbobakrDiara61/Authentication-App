# Premium MERN Stack Authentication System

A robust, modern, and highly secure Authentication System built using the MERN Stack. It features multi-layered security controls such as JWT (Access/Refresh Tokens), email verification (OTP via Nodemailer/SMTP), account deletion. 
The frontend features a beautiful glassmorphic UI with floating glowing shapes and smooth animations.

---

## Key Features

*   **Secure Session Management**: Custom JWT token flow utilizing short-lived Access Tokens and long-lived Refresh Tokens (stored in secure `httpOnly` and `sameSite` cookies).
*   **Email Verification**: Dynamic OTP code generation sent via Nodemailer (using SMTP) with HTML styling.
*   **Password Self-Service**: Complete secure forgot/reset password system utilizing signature-validated reset tokens.
*   **Interactive Modern UI**: Designed with React, Tailwind CSS, custom moving glowing spheres, and premium glassmorphic UI components.
*   **Automatic Auth Recovery**: Axios interceptors automatically refresh expired access tokens in the background for a seamless user experience.
*   **Self-Service Account Deletion**: Secure account deletion protected behind authentication middleware.

---

## Tech Stack

### Frontend
*   **Framework**: [React](https://react.dev/) + [Vite](https://vite.dev/) (Lightning-fast HMR)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **State Management**: React Context API (`AuthContext` + custom `useAuth` hook)
*   **Routing**: [React Router Dom v7](https://reactrouter.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Toast Notifications**: [React Hot Toast](https://react-hot-toast.com/)

### Backend & Database
*   **Server Framework**: [Express](https://expressjs.com/) (Node.js)
*   **Database**: [MongoDB](https://www.mongodb.com/) (Object modeling via Mongoose)
*   **Security & Encryption**: `bcryptjs` for password hashing, `jsonwebtoken` for secure session tokens
*   **Mailing System**: [Nodemailer](https://nodemailer.com/)

---

## Project Structure

```text
auth-system/
├── backend/
│   ├── src/
│   │   ├── config/         # MongoDB and Nodemailer connection setups
│   │   ├── controllers/    # Authentication controllers (signup, login, forgot password, etc.)
│   │   ├── middlewares/    # Authentication protection middleware
│   │   ├── models/         # MongoDB Schemas (User Model)
│   │   ├── routes/         # Auth API routers (/api/auth)
│   │   ├── utils/          # Token helpers, verification email templates, validation schemas
│   │   └── index.js        # Main Express application entrypoint
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Glowing spheres (Ball), Spinner, Custom Form Inputs
│   │   ├── constants/      # Static data (features info, UI steps description)
│   │   ├── context/        # AuthContext wrapper
│   │   ├── hooks/          # useAuth custom authentication hooks
│   │   ├── pages/          # Home, Dashboard, LoginPage, RegisterPage, EmailVerification, etc.
│   │   ├── utils/          # RedirectHome, PrivateRoutes, and Axios API configurations
│   │   ├── App.jsx         # App router config & layout structure
│   │   └── main.jsx        # Root application entrypoint
│   └── package.json
│
└── package.json            # Root configuration file
```

---

## Environment Configuration

To run this application locally, you must configure environment variables for both backend and frontend.

### 1. Backend Config
Create a `.env` file inside the `backend` directory:

```env
# Server Config
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=your_mongodb_connection_uri

# JWT Keys (Choose strong random strings)
JWT_ACCESS_SECRET=your_jwt_access_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key

# SMTP Configuration (e.g., Mailtrap, Gmail)
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_sender_email@domain.com

# Client Origin (Frontend URL)
CLIENT_URL=http://localhost:5173

```

### 2. Frontend Config
Create a `.env` file inside the `frontend` directory:

```env
VITE_SERVER_URL=http://localhost:3000
```

---

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   A running MongoDB instance (or MongoDB Atlas account)

### Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd auth-system
    ```

2.  **Setup the Backend**:
    ```bash
    cd backend
    npm install
    ```
    *Add your backend `.env` variables (see details above).*

3.  **Setup the Frontend**:
    ```bash
    cd ../frontend
    npm install
    ```
    *Add your frontend `.env` variables.*

### Running the Project

*   **Start the Backend Dev Server** (starts server on port `3000`):
    ```bash
    cd backend
    npm run dev
    ```

*   **Start the Frontend App** (starts Vite dev server on `http://localhost:5173`):
    ```bash
    cd frontend
    npm run dev
    ```