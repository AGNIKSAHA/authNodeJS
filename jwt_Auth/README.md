# 🔐 JWT Authentication with HttpOnly Cookies  
**Node.js · Express · TypeScript · MongoDB · Google OAuth**

A **production-grade authentication backend** built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**, using **JWT access & refresh tokens stored in HttpOnly cookies**.

This backend supports:
- Local authentication (email/password)
- Google OAuth (backend-driven, browser-initiated)
- Secure password reset via email

No frontend is required to test authentication flows.

---

## ✨ Features

- ✅ JWT **Access Token + Refresh Token**
- ✅ Tokens stored in **HttpOnly cookies**
- ✅ Local login & logout
- ✅ Google OAuth 2.0 (Passport)
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
- **passport**
- **passport-google-oauth20**
- **nodemailer**
- **cookie-parser**
- **tsx**

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
│   │   │   ├── env.ts
│   │   │   └── passport.ts
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── catch.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   └── mail.ts
│   │   ├── validators/
│   │   │   └── validators.ts
│   │   └── types/
│   │       └── express.d.ts
│   └── modules/
│       ├── auth/
│       │   ├── auth.controller.ts
│       │   └── auth.routes.ts
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
├── tsconfig.json
├── package.json
├── .env
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone repository

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

Create `.env`:

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

GOOGLE_CLIENT_ID=xxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxxxxx
GOOGLE_CALLBACK_URL=http://localhost:4020/api/v1/auth/google/callback

FRONTEND_URL=http://localhost:3000
```

Restart server after changes.

---

## 🔐 Authentication Flow

### Local Auth
- Signup → hash password → save user
- Login → issue JWT tokens → store in cookies
- Logout → clear cookies & revoke refresh token

### Google OAuth (No Frontend)
- Open browser → `GET /api/v1/auth/google`
- Google login screen appears
- Google redirects to backend callback
- Backend issues JWT cookies
- User authenticated

⚠️ Google OAuth **cannot be tested via Postman** (browser required).

---

## 📌 API Endpoints

### Public

- `GET /api/v1/health`
- `POST /api/v1/users/register`
- `POST /api/v1/users/login`
- `POST /api/v1/users/forgot-password`
- `POST /api/v1/users/reset-password/:token`
- `GET /api/v1/auth/google`
- `GET /api/v1/auth/google/callback`

### Protected

- `GET /api/v1/users/me`
- `POST /api/v1/users/logout`

---

## 🍪 Cookie Details

| Cookie | Purpose |
|------|--------|
| access_token | Authentication |
| refresh_token | Token refresh |

Both are **HttpOnly**, `SameSite=lax`, `Secure` in production.

---

## 🧪 Testing

### Google OAuth
1. Start server
2. Open browser
3. Visit `http://localhost:4020/api/v1/auth/google`
4. Login with Google
5. Cookies are set

### Protected APIs
- Use browser directly, or
- Copy cookies to Postman

---

## 🛡️ Security Notes

- Passwords hashed with bcrypt (12 rounds)
- JWT stored in HttpOnly cookies
- Refresh tokens stored & revoked in DB
- Strict validation for auth endpoints

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
feat(auth): add google oauth with jwt cookies
```

---

## 🏁 Final Notes

This project is:
- Backend-only friendly
- Secure by default
- Strictly typed
- Production-ready

Ideal for:
- Learning real-world authentication
- Bootstrapping secure APIs
- Interview-ready Node.js architecture
