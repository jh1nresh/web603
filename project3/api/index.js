// Vercel serverless entry point.
//
// Vercel serves client/dist as static files and routes everything under /api
// here, so this function only ever handles the REST API. The same Express app
// is used unchanged — createApp() skips its own static-file serving when the
// VERCEL environment variable is present.

import { createApp } from '../server/src/app.js'
import { connectDB } from '../server/src/config/db.js'

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error('MONGO_URI must be set for the API function to start')
}
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set for the API function to start')
}

const app = createApp()

// A warm container is reused across invocations, so the connection promise is
// created once at module scope and awaited on every request. connectDB is
// idempotent, which keeps a cold start from opening a second connection.
let connection = null

export default async function handler(req, res) {
  if (!connection) {
    connection = connectDB(MONGO_URI).catch((err) => {
      // Clear the cache so the next invocation retries instead of reusing a
      // permanently rejected promise.
      connection = null
      throw err
    })
  }

  // Vercel's Node runtime reads and parses the request body before invoking
  // the function, which leaves the stream exhausted — express.json() would
  // then fail with "stream is not readable". body-parser skips its own read
  // when req._body is set, and uses the req.body Vercel already produced.
  if (req.body !== undefined) {
    req._body = true
  }

  try {
    await connection
  } catch (err) {
    res.statusCode = 503
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ message: 'Database unavailable' }))
    return
  }

  return app(req, res)
}
