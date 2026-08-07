// Turns whatever went wrong into a consistent JSON shape the client can render:
//   { message, errors: { field: 'message' } }

export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` })
}

export function errorHandler(err, req, res, _next) {
  // Mongoose schema validation — surface it per field so the form can highlight.
  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(
      Object.entries(err.errors).map(([field, e]) => [field, e.message])
    )
    return res.status(400).json({ message: 'Validation failed', errors })
  }

  // Duplicate key — in practice only the unique email index.
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern ?? { email: 1 })[0]
    return res.status(409).json({
      message: 'Validation failed',
      errors: { [field]: `That ${field} is already registered` },
    })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Invalid ${err.path}` })
  }

  const status = err.status || 500
  if (status >= 500) console.error(err)

  res.status(status).json({
    message: status >= 500 ? 'Something went wrong on the server' : err.message,
    ...(err.errors ? { errors: err.errors } : {}),
  })
}

// Lets async route handlers throw without a try/catch in every one of them.
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

export function httpError(status, message, errors) {
  const err = new Error(message)
  err.status = status
  if (errors) err.errors = errors
  return err
}
