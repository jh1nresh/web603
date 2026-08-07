import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand navbar-dark taskflow-navbar">
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/">
          <span className="me-2">☰</span>TaskFlow
        </Link>

        <div className="ms-auto d-flex align-items-center gap-2">
          {user ? (
            <>
              <span className="navbar-text text-white-50 d-none d-sm-inline">
                Hello, {user.name}
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/login">
                Login
              </Link>
              <Link className="btn btn-light btn-sm" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
