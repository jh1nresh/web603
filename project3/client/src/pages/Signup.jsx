import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Full name is required'
    else if (form.name.trim().length < 2) next.name = 'Name must be at least 2 characters'

    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Enter a valid email address'
    }

    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters'

    if (form.confirmPassword !== form.password) {
      next.confirmPassword = 'Passwords do not match'
    }
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const clientErrors = validate()
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length) return

    setSubmitting(true)
    try {
      await signup(form)
      navigate('/', { replace: true })
    } catch (err) {
      setErrors(err.errors && Object.keys(err.errors).length ? err.errors : { form: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-9 col-md-6 col-lg-5">
        <form className="card auth-card" onSubmit={handleSubmit} noValidate>
          <div className="card-body p-4">
            <h1 className="h4 text-center mb-4">Create Account</h1>

            {errors.form && <div className="alert alert-danger py-2">{errors.form}</div>}

            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={form.name}
                onChange={update('name')}
                autoComplete="name"
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={form.email}
                onChange={update('email')}
                autoComplete="email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password <span className="text-muted small">(min 6 characters)</span>
              </label>
              <input
                id="password"
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={form.password}
                onChange={update('password')}
                autoComplete="new-password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                value={form.confirmPassword}
                onChange={update('confirmPassword')}
                autoComplete="new-password"
              />
              {errors.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
            </div>

            <button className="btn btn-dark w-100" disabled={submitting}>
              {submitting ? 'Creating account…' : 'Sign Up'}
            </button>

            <p className="text-center mt-3 mb-0">
              Already registered? <Link to="/login">Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
