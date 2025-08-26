import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="nav-glass">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="nav-brand">
          <span className="gradient-text">
            Task Manager
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          {token && (
            <Link
              to="/tasks/new"
              className="nav-btn btn-add"
            >
              + Add Task
            </Link>
          )}
          
          {token ? (
            <button
              onClick={logout}
              className="nav-btn btn-secondary"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className={`nav-btn ${location.pathname === '/login' ? 'bg-white/20 text-white' : 'btn-secondary'}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="nav-btn btn-register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


