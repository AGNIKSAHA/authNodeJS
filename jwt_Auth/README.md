# 🔐 JWT Authentication with HttpOnly Cookies  
**Node.js · Express · TypeScript · MongoDB**

A **production-grade authentication backend** built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, using **JWT access & refresh tokens stored in HttpOnly cookies**.

This project focuses on **clean architecture**, **strict TypeScript**, **secure auth flows**, and **manual validation without Zod/Joi**.

---

## ✨ Features

- ✅ JWT **Access Token + Refresh Token**
- ✅ Tokens stored in **HttpOnly cookies**
- ✅ Secure login / logout
- ✅ Refresh token persistence in DB
- ✅ Password hashing with **bcryptjs**
- ✅ Forgot password & reset password via email
- ✅ Strict request validation (no `any`)
- ✅ Type-safe Express middleware
- ✅ Clean modular architecture
- ✅ Node.js 20+ / ESM / tsx runtime

---

## 🧱 Tech Stack

- **Node.js** (20+)
- **Express**
- **TypeScript** (strict)
- **MongoDB + Mongoose**
- **jsonwebtoken**
- **bcryptjs**
- **nodemailer**
- **cookie-parser**
- **tsx**

---

## 📁 Project Structure

```
.
├── index.ts
├── app/
│   ├── routes/
│   │   └── index.ts
│   ├── common/
│   │   ├── config/
│   │   │   ├── db.ts
│   │   │   └── env.ts
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── catch.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   └── mail.ts
│   │   ├── validators/
│   │   │   └── index.ts
│   │   └── types/
│   │       └── express.d.ts
│   └── modules/
│       ├── user/
│       │   ├── dto/
│       │   │   ├── login.dto.ts
│       │   │   └── signup.dto.ts
│       │   ├── user.controller.ts
│       │   ├── user.routes.ts
│       │   ├── user.model.ts
│       │   ├── user.types.ts
│       │   ├── user.validation.ts
│       │   └── user.helpers.ts
│       └── token/
│           ├── refreshToken.model.ts
│           └── token.service.ts
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

### 3️⃣ Environment Variables

Create a `.env` file:

```env
PORT=4020
NODE_ENV=development

MONGO_URI=mongodb://127.0.0.1:27017/auth_jwt

JWT_ACCESS_SECRET=access_secret_key_change_me
JWT_REFRESH_SECRET=refresh_secret_key_change_me

JWT_ACCESS_EXPIRES_IN=900
JWT_REFRESH_EXPIRES_IN=604800

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

FRONTEND_URL=http://localhost:3000
```

---

### 4️⃣ Run the project

```bash
npm run dev
```

---

## 🔐 Authentication Flow

- Signup → hash password → save user
- Login → issue access & refresh tokens
- Tokens stored in HttpOnly cookies
- Auth middleware validates access token
- Refresh token rotates access token
- Logout clears cookies & DB token

---

## 📌 API Endpoints

### Public
- POST `/api/v1/users/register`
- POST `/api/v1/users/login`
- POST `/api/v1/users/forgot-password`
- POST `/api/v1/users/reset-password/:token`

### Protected
- GET `/api/v1/users/me`
- POST `/api/v1/users/logout`

---

## 🍪 Cookie Details

| Cookie | Purpose | HttpOnly |
|------|--------|----------|
| access_token | Auth | ✅ |
| refresh_token | Token refresh | ✅ |

---

## 🛡️ Security Notes

- Password hashing with bcrypt
- JWT stored in HttpOnly cookies
- Refresh token stored in DB
- Strict request validation

---

## 📦 Scripts

```bash
npm run dev
npm run build
npm start
```

---

## 🧾 Git Commit Example

```bash
feat(auth): implement JWT auth with access & refresh tokens
```

---

## 🏁 Final Notes

This project is ideal for:
- Learning real-world authentication
- Production-ready backend templates
- Interview-ready Node.js architecture
