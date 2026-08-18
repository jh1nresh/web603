# TaskFlow — Project 3 (Task 3: Coding)

A full-stack personal task manager SPA. Built to the Task 1 proposal and Task 2
wireframes: React front end, Express + MongoDB back end, JWT auth in HTTP-only
cookies, and PWA installability.

WEB603 — Full Stack Web Development · Module 5 · Project 3

## Stack

| Layer | Technology |
|---|---|
| Front end | React 18, React Router v6, Axios, Bootstrap 5, SASS/SCSS, Vite |
| Back end | Node.js, Express 4, MongoDB, Mongoose, bcryptjs, jsonwebtoken, express-session (+ connect-mongo), cookie-parser |
| PWA | Web App Manifest + service worker (app-shell caching) |

## Layout

```
project3/
├── server/                  Express REST API
│   ├── src/config/db.js     Mongoose connection
│   ├── src/models/          User (bcrypt hashing) · Task (per-user, priority, completed)
│   ├── src/middleware/      requireAuth (JWT cookie) · error handling
│   ├── src/routes/          auth.js · tasks.js
│   └── src/app.js           middleware wiring, CORS, session, SPA serving in production
└── client/                  React SPA
    ├── src/context/         AuthContext — Context API session state
    ├── src/components/      Navbar · ProtectedRoute · TaskForm · TaskList · TaskItem · StatsBar · FilterButtons
    ├── src/pages/           Dashboard (protected) · Login · Signup
    ├── src/styles/main.scss Bootstrap import + TaskFlow layer
    └── public/              manifest.webmanifest · sw.js · icons
```

## Running locally

MongoDB must be reachable (local `mongod` or an Atlas URI).

```bash
cd server
cp .env.example .env      # then edit the secrets
npm install
npm run dev               # http://localhost:4000
```

```bash
cd client
npm install
npm run dev               # http://localhost:5173
```

The Vite dev server proxies `/api` to port 4000, so the app is same-origin in
development and the auth cookie is sent without any cross-site relaxation.

## API

All task routes require the auth cookie and only ever touch the signed-in
user's own documents.

| Method | Route | Purpose |
|---|---|---|
| `POST` | `/api/auth/signup` | Create account, set auth cookie |
| `POST` | `/api/auth/login` | Log in, set auth cookie |
| `POST` | `/api/auth/logout` | Clear cookie and destroy session |
| `GET` | `/api/auth/me` | Current user — lets the SPA restore state on refresh |
| `GET` | `/api/tasks?status=all\|active\|done` | List tasks + `{ total, done, active }` stats |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/:id` | Update title / description / priority / completed |
| `DELETE` | `/api/tasks/:id` | Delete a task |

Errors always come back as `{ message, errors: { field: "message" } }`, which is
what lets each form highlight the exact field that failed.

## Feature checklist (from the Task 1 proposal)

- **User authentication** — signup, login, logout; JWT in an HTTP-only cookie plus a server-side session stored in MongoDB
- **Task CRUD** — every task carries a `user` reference and every query is scoped to it
- **Priority levels** — High / Medium / Low, colour-coded left border and badge; the list sorts high priority first
- **Status & filtering** — complete/incomplete toggle, All / Active / Done filters resolved server-side
- **Form validation** — client-side checks on every form, repeated server-side so the API is safe on its own
- **Responsive design** — Bootstrap 5 grid; single column on mobile, two columns from `lg` up
- **PWA** — manifest with 192/512 icons and a service worker caching the app shell (network-first for navigations, never for `/api`)
- **Live stats** — total / done / active counts returned with every list request

## Security notes

- Passwords are bcrypt-hashed (10 salt rounds) and the field is `select: false`, so a plain `find()` never returns them.
- The JWT lives in an HTTP-only cookie, so page JavaScript cannot read it — `document.cookie` is empty in the browser.
- `secure: true` is set on cookies when `NODE_ENV=production`, which requires HTTPS.
- Login failures return one message for both "no such email" and "wrong password", so the API doesn't confirm which addresses are registered.
- Update and delete queries match on `{ _id, user }`, so one account cannot touch another's tasks even with a valid id.

## Verification performed

Back end, via curl against a local MongoDB:

- Signup validation returns per-field messages; duplicate email is rejected with 409
- Auth cookie is issued on signup/login; `/api/tasks` returns 401 without it
- Second account sees an empty list, and gets `Task not found` when using the first account's task id for `PUT` and `DELETE`
- Stored password begins `$2a$10$…` (bcrypt), never plaintext
- Sessions are written to the `sessions` collection in MongoDB

Front end, driven in a browser:

- Anonymous visit to `/` redirects to `/login`; after login the dashboard restores
- Signup form blocks empty fields and mismatched passwords before any request
- Wrong password shows "Email or password is incorrect"
- Add / edit / toggle / delete all round-trip to the database; stats and filters stay in step
- Inline edit rejects an empty title
- `document.cookie` is empty (HTTP-only), the service worker registers, and the manifest parses with three icon entries
- Layout verified at 375 px and 1280 px

## Deployment

`NODE_ENV=production` makes the API serve `client/dist` and marks cookies
`secure`, so a single Render/Railway service hosts both halves over HTTPS.
[`render.yaml`](../render.yaml) in the repository root defines that service
(build, start command, health check, and environment variables), and
[DEPLOY.md](DEPLOY.md) walks through MongoDB Atlas, the Render blueprint, and
the checks to run against the live URL.
