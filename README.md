# Ada Real Estate

A full-stack real estate platform built with Next.js, TypeScript, MongoDB, React Query, Redux Toolkit and Tailwind CSS.

---

## Tech Stack

- Next.js 16
- TypeScript
- MongoDB + Mongoose
- React Query
- Redux Toolkit
- Tailwind CSS
- JWT Authentication
- Nodemailer (Gmail SMTP)
- Cloudinary Image Storage
- Cloudflare Deployment

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
# =========================
# MongoDB Database
# =========================

MONGODB_URI=your_mongodb_connection_string


# =========================
# Authentication
# =========================

JWT_SECRET=your_random_secret_key


# =========================
# Cloudinary Image Upload
# =========================

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret


# =========================
# Gmail SMTP
# Email verification & Password reset
# =========================

EMAIL_USER=your_gmail_address@gmail.com

EMAIL_PASSWORD=your_google_app_password

EMAIL_FROM=your_gmail_address@gmail.com


# =========================
# Application URL
# =========================

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Gmail App Password Setup

This project uses Gmail SMTP with Nodemailer for:

- Email verification codes
- Password reset emails

Setup steps:

1. Enable 2-Step Verification on your Google Account.
2. Create a Google App Password.
3. Add the generated password to:

```env
EMAIL_PASSWORD=your_google_app_password
```

Example:

```env
EMAIL_USER=example@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM=example@gmail.com
```

Never commit `.env.local` to GitHub.

---

## Features

### User

- Register with email verification code
- Login / Logout
- Forgot password
- Reset password
- User profile
- Favorites
- Reservations management
- Notifications

### Reservation System

- Property search
- Jalali date picker
- Availability checking
- Prevent double booking
- Reservation management

### Admin Panel

- Admin authentication
- Property management
- Image upload management
- Reservation management
- User management
- Notification management
- System settings

---

## Production Build

Before deployment test the production build:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## Deployment

The project can be deployed on Cloudflare and other platforms supporting Next.js.

Required environment variables must be added in the deployment dashboard before deployment.

```env
MONGODB_URI

JWT_SECRET

CLOUDINARY_CLOUD_NAME

CLOUDINARY_API_KEY

CLOUDINARY_API_SECRET

EMAIL_USER

EMAIL_PASSWORD

EMAIL_FROM

NEXT_PUBLIC_APP_URL
```

---

## Project Structure

```text
src/
 ├─ app/
 │  ├─ api/
 │  ├─ components/
 │  ├─ models/
 │  ├─ lib/
 │  └─ services/
 │
 ├─ hooks/
 └─ store/
```

---

## Security Notes

- Do not upload `.env.local`
- Do not expose MongoDB credentials
- Do not expose JWT_SECRET
- Do not expose Cloudinary API Secret
- Use Gmail App Password instead of your normal Gmail password
