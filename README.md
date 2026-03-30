# EasyDoc - Doctor Appointment Booking System

A full-stack web application for booking doctor appointments online. Patients can browse doctors by speciality and book appointments, while admins manage doctors and appointments through a dedicated dashboard.

## Live Demo

| App | URL |
|-----|-----|
| Patient Frontend | https://easydoc-frontend.vercel.app |
| Admin Dashboard | https://easydoc-admin.vercel.app |
| Backend API | https://easydoc-backend.vercel.app |

## Features

**Patient (Frontend)**
- Register and log in securely
- Browse doctors by speciality
- View doctor profiles and availability
- Book, view, and cancel appointments
- Update personal profile with photo

**Admin Dashboard**
- Secure admin login
- Add new doctors with image upload
- View and manage all doctors
- View all appointments
- Toggle doctor availability

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend & Admin | React 19, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| File Storage | Cloudinary |
| Auth | JWT, bcrypt |
| Deployment | Vercel |

## Project Structure

```
EasyDoc/
├── frontend/     # Patient-facing React app
├── admin/        # Admin dashboard React app
└── backend/      # Express REST API
```

## API Endpoints

**Admin** — `/api/admin`
- `POST /login` — Admin login
- `POST /add-doctor` — Add a doctor (auth required)
- `POST /all-doctors` — List all doctors (auth required)
- `POST /change-availability` — Toggle doctor availability (auth required)

**Doctor** — `/api/doctor`
- `GET /list` — Get all doctors

**User** — `/api/user`
- `POST /register` — Register new user
- `POST /login` — User login
- `GET /get-profile` — Get user profile (auth required)
- `POST /update-profile` — Update profile with photo (auth required)
- `POST /book-appointment` — Book an appointment (auth required)
- `GET /appointments` — List user appointments (auth required)
- `POST /cancel-appointment` — Cancel an appointment (auth required)

## Local Setup

**Prerequisites:** Node.js, MongoDB Atlas account, Cloudinary account

1. **Clone the repo**
   ```bash
   git clone https://github.com/Akshara-Vootkuri/doctor-system.git
   cd doctor-system
   ```

2. **Backend**
   ```bash
   cd backend
   npm install
   ```
   Create `backend/.env`:
   ```
   MONGODB_URI=your_mongodb_uri
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_SECRET_KEY=your_cloudinary_secret
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=yourpassword
   JWT_SECRET=your_jwt_secret
   ```
   ```bash
   npm run server
   ```

3. **Frontend**
   ```bash
   cd frontend
   npm install
   ```
   Create `frontend/.env`:
   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```
   ```bash
   npm run dev
   ```

4. **Admin**
   ```bash
   cd admin
   npm install
   ```
   Create `admin/.env`:
   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```
   ```bash
   npm run dev
   ```
