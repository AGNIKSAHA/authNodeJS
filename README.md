# 🚀 Session-Based Authentication API (Node.js + TypeScript)

A **production-ready backend API** built with **Node.js (v25)**, **Express**, **TypeScript**, and **MongoDB**, featuring **DB-backed session authentication**, strict typing, middleware-based authorization, and clean modular architecture.

---

## ✨ Features

- ✅ Node.js **v25** support
- ✅ TypeScript (**strict mode**, no `any`)
- ✅ MongoDB **session-based authentication**
- ✅ Session expiry with **TTL + runtime validation**
- ✅ Login / Logout flow
- ✅ Auth middleware for protected routes
- ✅ Cookie-based authentication (`HttpOnly`)
- ✅ Modular, scalable folder structure
- ✅ Clean separation of concerns (User / Session modules)

---

## 🧱 Tech Stack

- **Node.js** v25
- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **tsx** (TypeScript runtime for Node 25)
- **cookie-parser**
- **uuid**

---

## 📁 Project Structure

```
.
├── index.ts
├── app/
│   ├── routes.ts
│   ├── common/
│   │   ├── config/
│   │   │   └── db.ts
│   │   └── middlewares/
│   │       ├── auth.middleware.ts
│   │       ├── catch.middleware.ts
│   │       └── error.middleware.ts
│   └── modules/
│       ├── user/
│       │   ├── user.controller.ts
│       │   ├── user.routes.ts
│       │   ├── user.model.ts
│       │   ├── user.types.ts
│       │   └── user.validation.ts
│       └── session/
│           ├── session.model.ts
│           ├── session.service.ts
│           └── session.types.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/session-auth
```

---

### 4️⃣ Run the project (Node 25 compatible)

```bash
npm run dev
```

> Uses **tsx** for hot reload (recommended for Node 25)

---

## 🔐 Authentication Flow

1. **Login**
   - Creates a session in MongoDB
   - Stores `sessionId` in an **HttpOnly cookie**
   - Session has an expiry time

2. **Auth Middleware**
   - Reads `uid` cookie
   - Validates session from DB
   - Checks expiry
   - Attaches `userId` to `req`

3. **Logout**
   - Deletes session from DB
   - Clears cookie

---

## 📌 API Endpoints

### 🔓 Public Routes

#### Health Check
```
GET /api/v1/health
```

Response:
```json
{
  "status": "ok"
}
```

---

#### Signup
```
POST /api/v1/users/register
```

Body:
```json
{
  "name": "Agnik",
  "email": "agnik@example.com",
  "password": "strongPassword123"
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
  "password": "strongPassword123"
}
```

---

### 🔒 Protected Routes

#### Get Current User (example)
```
GET /api/v1/users/me
```

Requires:
- Valid session cookie (`uid`)

---

#### Logout
```
POST /api/v1/users/logout
```

Effect:
- Session deleted from DB
- Cookie cleared

---

## ⏳ Session Expiry

```ts
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24; // 24 hours
```

- Expiry stored in DB
- MongoDB TTL index auto-cleans sessions
- Runtime expiry check prevents edge cases

---

## 🛡️ Security Notes

- ❌ Plain-text passwords are used **only for learning/demo**
- ✅ HttpOnly cookies
- ✅ Server-side session invalidation

### 🔴 Recommended for Production
- Password hashing (`bcrypt`)
- HTTPS + secure cookies
- Redis-based session store
- Rate limiting & helmet

---

## 🧪 Testing with Postman

1. Login → cookie is stored automatically
2. Call protected routes
3. Logout → session invalidated

⚠️ Do **not** manually set cookies in headers  
Use Postman’s cookie manager or login flow.

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
feat(auth): implement MongoDB session-based authentication with logout
```

---

## ✨ Author

**Agnik Saha**  
Backend Developer | Node.js | TypeScript

