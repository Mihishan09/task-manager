import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../axios';
import { useToast } from '../components/ToastProvider';

export default function Login() {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
      toast.error('Invalid credentials');
    }
  }

  return (
    <div className="center-screen">
      <div className="form-container">
        <div className="dashboard-header">
          <h1 className="page-title">
            <span className="gradient-text">Welcome back</span>
          </h1>
          <p className="subtitle">Sign in to manage your tasks</p>
        </div>

        <div className="glass-card">
          {error && <div className="error-box">{error}</div>}
          <form onSubmit={handleSubmit} className="form-group">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Email</label>
              <input 
                type="email" 
                className="input-field" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Password</label>
              <input 
                type="password" 
                className="input-field" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password"
                required 
              />
            </div>
            <button className="btn-primary">
              Sign In
            </button>
          </form>
          <div className="text-center mt-6 text-gray-300">
            No account? <Link to="/register" className="link-text">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


