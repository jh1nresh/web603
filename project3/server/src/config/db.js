import mongoose from 'mongoose'

export async function connectDB(uri) {
  mongoose.set('strictQuery', true)

  // Already connected — a warm serverless container reuses the open socket
  // rather than opening a second one on every invocation.
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  // Connecting: another invocation got here first, so wait for that attempt
  // instead of racing it with a duplicate connect().
  if (mongoose.connection.readyState === 2) {
    await mongoose.connection.asPromise()
    return mongoose.connection
  }

  await mongoose.connect(uri)
  console.log(`MongoDB connected: ${mongoose.connection.name}`)
  return mongoose.connection
}
