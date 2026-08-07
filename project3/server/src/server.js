import 'dotenv/config'
import { createApp } from './app.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskflow'

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.error('JWT_SECRET must be set in production')
  process.exit(1)
}
process.env.JWT_SECRET ||= 'dev-jwt-secret-not-for-production'

try {
  await connectDB(MONGO_URI)
  createApp().listen(PORT, () => {
    console.log(`TaskFlow API listening on http://localhost:${PORT}`)
  })
} catch (err) {
  console.error('Failed to start server:', err.message)
  process.exit(1)
}
