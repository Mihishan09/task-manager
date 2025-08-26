import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { TextField, Button, Paper, Typography, Container, Box, Alert } from '@mui/material';
import axios from 'axios';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.requiresVerification) {
        setShowVerification(true);
      } else {
        localStorage.setItem('token', response.data.token);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/verify', {
        email,
        code: verificationCode,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await axios.post('/api/auth/google', {
        credential: credentialResponse.credential,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Google login failed');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} className="p-8 w-full">
          <Typography component="h1" variant="h5" className="mb-6 text-center">
            Sign in to Task Manager
          </Typography>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          {!showVerification ? (
            <form onSubmit={handleEmailLogin}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="mb-4"
              >
                Sign In
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerification}>
              <Typography className="mb-4">
                Please enter the verification code sent to your email
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Verification Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="mb-4"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="mb-4"
              >
                Verify
              </Button>
            </form>
          )}

          <div className="mt-4 text-center">
            <Typography variant="body2" className="mb-4">
              Or sign in with
            </Typography>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError('Google login failed')}
              />
            </div>
          </div>

          <Box className="mt-4 text-center">
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 