# Event Management System

A full-stack **MERN** (MongoDB, Express, React, Node) web application for managing events and event participation, built from the project's documentation with a modular, component-based architecture, JWT authentication, and a Dark/Light theme design system.

The system has two sections:

- **User Section** — browse events, register, manage "My Events," update profile, view notifications.
- **Office Section (Admin)** — dashboard, event CRUD, registration management, event-scoped volunteer management, category management, and user management.

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Database | MongoDB + Mongoose |
| Backend | Node.js + Express.js |
| Frontend | React 18 (Vite) |
| Styling | Tailwind CSS |
| Auth | JWT (JSON Web Tokens) + bcrypt password hashing |
| API testing | Postman (bring your own collection) |

This is a **Node.js** project on both ends, so dependencies are managed with **`package.json` / npm**, not `requirements.txt` (that's a Python convention and isn't applicable here).

---

## 2. Project Structure

```text
event-management-system/
├── backend/
│   ├── config/           # MongoDB connection
│   ├── controllers/      # Route handlers (auth, event, registration, volunteer, category, user, admin, notification)
│   ├── middleware/       # JWT auth, role guards, error handling, validation
│   ├── models/           # Mongoose schemas: User, Admin, Event, Registration, Volunteer, Category, Notification
│   ├── routes/           # Express routers per feature
│   ├── services/         # Business rules (registration validation, seat counting, etc.)
│   ├── utils/            # Token generation, async handler, custom error, DB seed script
│   ├── server.js         # App entry point
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/       # Navbar, Footer, Button, Input, Modal, Table, Badge, etc.
    │   │   ├── events/       # EventCard, EventList, EventFilter
    │   │   ├── registration/ # RegistrationForm, RegistrationCard
    │   │   ├── volunteer/    # VolunteerCard, VolunteerForm
    │   │   └── admin/        # AdminSidebar, DashboardCard, EventForm, EventManagement,
    │   │                     # UserManagement, RegistrationManagement, VolunteerManagement
    │   ├── pages/             # Home, Events, EventDetails, Login, Register, AdminLogin,
    │   │                      # UserDashboard, MyEvents, Profile, Notifications,
    │   │                      # AdminDashboard, AdminEvents, AdminEventDetail,
    │   │                      # AdminRegistrations, AdminVolunteers, AdminUsers
    │   ├── context/           # AuthContext, ThemeContext
    │   ├── services/          # axios API layer (one file per resource)
    │   ├── routes/            # ProtectedRoute (role-based route guard)
    │   ├── hooks/              # useDebounce
    │   ├── utils/              # formatters
    │   ├── App.jsx             # Route table
    │   ├── main.jsx             # Entry point
    │   └── index.css            # Tailwind + design-token CSS variables
    ├── .env.example
    ├── tailwind.config.js
    └── package.json
```

---

## 3. Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)
- A MongoDB instance — either:
  - Local MongoDB running at `mongodb://127.0.0.1:27017`, or
  - A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended if you don't want to install MongoDB locally)

---

## 4. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/event_management_system
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Seed an initial Admin account and default event categories:

```bash
npm run seed
```

This creates:
- Admin login: `admin@example.com` / `Admin@123` (override with `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` env vars before seeding)
- Categories: Technical, Cultural, Sports, Workshop, Seminar, Competition, Other

Start the API:

```bash
npm run dev      # with nodemon, auto-restarts on changes
# or
npm start
```

### Testing without a real database

If you just want to try the app without setting up Atlas or a local MongoDB, you can use a temporary **in-memory MongoDB** instead — no code changes needed anywhere in `models/`, `controllers/`, or `routes/`:

```bash
npm run dev:memdb
```

This downloads a MongoDB binary once (via `mongodb-memory-server`) and runs a throwaway database in memory. All data is lost when the server stops — useful for quick testing, not for real use. To use it manually instead of the npm script, set `USE_IN_MEMORY_DB=true` in `.env`.

The API runs at `http://localhost:5000/api`. Health check: `GET http://localhost:5000/api/health`.

---

## 5. Frontend Setup

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `frontend/.env` if your API isn't on the default port:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173`. Vite is also configured to proxy `/api` to `http://localhost:5000` during development.

---

## 6. Using the App

1. **As a User:** go to `/register`, create an account, browse `/events`, open an event, and register. Manage your registrations from `/my-events`.
2. **As Admin (Office Section):** go to `/admin/login` and sign in with the seeded admin credentials. From the Admin Dashboard you can create/edit/delete events, view registrations, manage event-specific volunteers (via "Manage" on an event), and manage user accounts.

Categories must exist before creating an event (the seed script adds a default set) — you can also manage categories directly through the `/api/categories` endpoints.

---

## 7. Key Business Rules Implemented

Enforced on the backend (not just hidden in the UI), per the project's security requirements:

- Passwords are hashed with bcrypt; never stored in plain text.
- JWT-based authentication; separate token payload role (`user` / `admin`) drives authorization.
- Duplicate registration for the same event is blocked (unique index + explicit check).
- Registration is blocked after the registration deadline.
- Registration is blocked once an event reaches capacity.
- Only authenticated users can register; only Admins can manage events, volunteers, categories, and users.
- Deleting an event also removes its registrations and volunteers.

---

## 8. API Overview

All routes are prefixed with `/api`.

```text
POST   /auth/register
POST   /auth/login
POST   /auth/admin/login
GET    /auth/me

GET    /events
GET    /events/:id
GET    /events/:id/full        (Admin)
POST   /events                 (Admin)
PUT    /events/:id             (Admin)
DELETE /events/:id             (Admin)

POST   /registrations          (User)
GET    /registrations          (User: own · Admin: all/filterable)
DELETE /registrations/:id

POST   /volunteers             (Admin)
GET    /volunteers             (Admin)
PUT    /volunteers/:id         (Admin)
DELETE /volunteers/:id         (Admin)

GET    /categories
POST   /categories             (Admin)
PUT    /categories/:id         (Admin)
DELETE /categories/:id         (Admin)

GET    /users/profile          (User)
PUT    /users/profile          (User)
GET    /users                  (Admin)
GET    /users/:id              (Admin)
PUT    /users/:id/status       (Admin)

GET    /notifications          (User)
PUT    /notifications/:id/read (User)

GET    /admin/dashboard        (Admin)
```

---

## 9. Design System Notes

The Tailwind config and `index.css` implement the documented design system:

- **Theme:** Dark (default) and Light, switched via a `theme-light` class on `<html>`, driving CSS variables — components never branch logic on theme.
- **Palette:** Midnight Navy / Deep Purple base with Electric Blue → Neon Violet gradient for primary actions.
- **Typography:** Inter, with the documented Display/Headline/Body/Label scale.
- **Shape & spacing:** 4px-based spacing scale, rounded cards (24px) and inputs (8px).
- **Glassmorphism:** used selectively for modals via `.glass-panel` (16px backdrop blur + translucent surface).
- **Breakpoints:** 640px / 1024px / 1440px, 12-column desktop / 4-column mobile intent via Tailwind's responsive utilities.

---

## 10. What's Not Included

Per the project scope, the following are intentionally left out (see docs section 57): a separate system-level role, an "Incharge" role, a separate volunteer login, payment processing, and multi-level administration. Volunteers are managed by Admin per event, not as their own account type.

---

## 11. Extending the App

The architecture is modular so these can be added later without rewrites: email/SMS notifications, QR-based attendance, certificates, feedback/ratings, calendar integration, and advanced volunteer scheduling.
