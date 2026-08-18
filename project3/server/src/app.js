import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import taskRoutes from './routes/tasks.js'
import { notFound, errorHandler } from './middleware/errors.js'

export function createApp() {
  const app = express()

  // Behind a TLS-terminating proxy (Render/Railway) so secure cookies work.
  app.set('trust proxy', 1)

  app.use(express.json())
  app.use(cookieParser())

  // credentials:true is required for the browser to send the HTTP-only cookie.
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
      credentials: true,
    })
  )

  app.use(
    session({
      name: 'taskflow_sid',
      secret: process.env.SESSION_SECRET || 'dev-session-secret',
      resave: false,
      saveUninitialized: false,
      // The default MemoryStore leaks and can't survive a restart, so sessions
      // live in MongoDB alongside the rest of the data.
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskflow',
        collectionName: 'sessions',
        ttl: 7 * 24 * 60 * 60,
      }),
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      },
    })
  )

  app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
  app.use('/api/auth', authRoutes)
  app.use('/api/tasks', taskRoutes)

  // In production the API also serves the built SPA, so one deployment covers
  // both and the auth cookie stays same-origin.
  if (process.env.NODE_ENV === 'production') {
    // Resolved from this file, not from cwd, so the host can start the server
    // from any working directory (Render runs it from the repo's root dir).
    const clientDist = fileURLToPath(new URL('../../client/dist', import.meta.url))
    app.use(express.static(clientDist))
    app.get(/^\/(?!api\/).*/, (req, res) => res.sendFile(path.join(clientDist, 'index.html')))
  }

  app.use(notFound)
  app.use(errorHandler)

  return app
}
