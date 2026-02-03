# 🔐 JWT Authentication with HttpOnly Cookies (Node.js + TypeScript)

A **production-ready authentication backend** built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, using **JWT stored in HttpOnly cookies** for secure, stateless authentication.

This project demonstrates **modern auth best practices** with clean architecture, strict typing, and scalable design.

---

## ✨ Features

- ✅ JWT authentication (stateless)
- ✅ JWT stored in **HttpOnly cookies**
- ✅ Secure login & logout flow
- ✅ Password hashing with **bcryptjs**
- ✅ Strict TypeScript (no `any`)
- ✅ Express middleware–based authorization
- ✅ Modular folder structure
- ✅ Node.js 20+ compatible (tsx runtime)

---

## 🧱 Tech Stack

- **Node.js** (20+)
- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **jsonwebtoken**
- **bcryptjs**
- **cookie-parser**
- **tsx** (dev runtime)

---

## 📁 Project Structure

```
.
├── index.ts
├── app/
│   ├── routes.ts
│   ├── common/
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   └── env.ts
│   │   ├── middlewares/
│   │   │   ├── jwt-auth.middleware.ts
│   │   │   ├── catch.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── utils/
│   │   │   └── jwt.ts
│   │   └── types/
│   │       └── express.d.ts
│   └── modules/
│       └── user/
│           ├── user.controller.ts
│           ├── user.routes.ts
│           ├── user.model.ts
│           ├── user.types.ts
│           ├── user.validation.ts
│           └── dto/
│               ├── login.dto.ts
│               └── signup.dto.ts
├── tsconfig.json
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd jwt-auth
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/jwt-auth
JWT_SECRET=super_secret_key_change_me
JWT_EXPIRES_IN=86400
NODE_ENV=development
```

---

### 4️⃣ Run the project (development)

```bash
npm run dev
```

> Uses **tsx** for fast reload and Node.js ESM support.

---

## 🔐 Authentication Flow

### 1. Signup
- Creates a user
- Password is hashed with bcrypt

### 2. Login
- Verifies credentials
- Signs a JWT
- Stores JWT in an **HttpOnly cookie** (`access_token`)

### 3. Auth Middleware
- Reads JWT from cookies
- Verifies token
- Attaches `userId` to `req`

### 4. Logout
- Clears the authentication cookie

---

## 📌 API Endpoints

### 🔓 Public Routes

#### Health Check
```
GET /api/v1/health
```

---

#### Signup
```
POST /api/v1/users
```

Body:
```json
{
  "name": "Agnik",
  "email": "agnik@example.com",
  "password": "StrongPassword123"
}
```

---

#### Login
```
POST /api/v1/users/login
```

Body:
```json
{
  "email": "agnik@example.com",
  "password": "StrongPassword123"
}
```

Response:
- Sets `access_token` cookie

---

### 🔒 Protected Routes

#### Get Current User
```
GET /api/v1/users/me
```

Requires:
- Valid `access_token` cookie

---

#### Logout
```
POST /api/v1/users/logout
```

Effect:
- Clears JWT cookie

---

## 🍪 JWT Cookie Details

- **Name:** `access_token`
- **HttpOnly:** true
- **SameSite:** `lax`
- **Secure:** enabled in production
- **MaxAge:** 24 hours

---

## 🛡️ Security Notes

### ✅ Implemented
- Password hashing (bcrypt)
- HttpOnly JWT cookies
- Stateless authentication

### 🔴 Recommended for Production
- CSRF protection (double-submit token)
- Refresh tokens
- Rate limiting
- HTTPS only (`secure: true` cookies)

---

## 🧪 Testing with Postman

1. Call **Login** → cookie is stored automatically
2. Call protected routes → cookie sent automatically
3. Call **Logout** → cookie cleared

⚠️ Do not manually add cookies to headers.

---

## 📦 Scripts

```bash
npm run dev     # Development (tsx)
npm run build   # Build TypeScript
npm start       # Run compiled JS
```

---

## 🧾 Git Commit Convention

Example:
```bash
feat(auth): implement JWT authentication with HttpOnly cookies
```

---
