# Week 7 Day 2 Exercise — React Router v6 (m6-w3-d2-exercise)

In-class demo from Module6-Week3-Day2: practice `react-router-dom` v6, working in `App.jsx` only.

## What it covers

- `BrowserRouter as Router`, `Routes`, `Route` — basic routing (`/`, `/about`)
- `Link` — clickable navigation instead of typing paths
- `Outlet` — nested routes (`PostLists` nested inside `Posts` at `/posts`)
- `useParams` — dynamic URL params (`/posts/:slug` renders a single blog post)

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, then check:

- `/` — Home View
- `/about` — About View
- `/posts` — Blog list with two posts
- `/posts/1`, `/posts/2` — individual post via `useParams`

To verify the production build:

```bash
npm run build
```

Note: the slides use `create-react-app`; this repo uses Vite (same as week7/day1) — the `App.jsx` code follows the slides as written.
