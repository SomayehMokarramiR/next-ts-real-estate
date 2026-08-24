# Ada Real Estate

A full-stack real estate platform built with Next.js, TypeScript, MongoDB, React Query, Redux Toolkit and Tailwind CSS.

## Tech Stack

- Next.js 16
- TypeScript
- MongoDB + Mongoose
- React Query
- Redux Toolkit
- Tailwind CSS
- JWT Authentication
- Nodemailer (Gmail SMTP)
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

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string


# Authentication
JWT_SECRET=your_jwt_secret_key


# Email Service (Gmail SMTP)
# Used for registration verification codes
# and password reset emails

EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_google_app_password
EMAIL_FROM=your_gmail_address@gmail.com


# Application URL

NEXT_PUBLIC_APP_URL=http://localhost:3000


# Optional

NODE_ENV=development
```

### Gmail App Password Setup

To send verification emails using Gmail:

1. Enable 2-Step Verification on your Google Account.
2. Create an App Password.
3. Put the generated password in:

```
EMAIL_PASSWORD
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

- Search properties
- Jalali date picker
- Availability checking
- Prevent double booking
- Reservation management

### Admin Panel

- Admin authentication
- Property management
- Reservation management
- User management
- Notification management
- System settings

---

## Build Production

Before deployment test production build:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## Deployment

The project can be deployed on platforms supporting Next.js.

Required environment variables must be added in the deployment dashboard.

---

## Project Structure

```
src/
 ├─ app/
 │  ├─ api/
 │  ├─ components/
 │  ├─ models/
 │  ├─ lib/
 │  └─ services/
 ├─ hooks/
 └─ store/
```

---

## Security Notes

- Do not upload `.env.local`
- Do not expose MongoDB credentials
- Do not expose JWT_SECRET
- Use App Passwords instead of Gmail account passwords

## Environment Variables

Before running the project, create a `.env.local` file in the root directory and add the following environment variables:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string


# JWT Authentication Secret
JWT_SECRET=your_random_secret_key


# Cloudinary Configuration (Image Upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


# Gmail SMTP Configuration (Email Verification & Password Reset)
EMAIL_USER=your_gmail_address
EMAIL_PASSWORD=your_google_app_password
EMAIL_FROM=your_gmail_address
```
