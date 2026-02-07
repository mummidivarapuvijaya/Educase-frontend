import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import BottomNav from '../components/BottomNav';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear field error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors({
        ...fieldErrors,
        [e.target.name]: ''
      });
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Validate form before submitting
    if (!validateForm()) {
      setError('Please fix the errors below');
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(formData);
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/profile');
      } else {
        // Clear any old/invalid data on failed login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      // Clear any old/invalid data on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Signin to your PopX account</h1>
        <p className="login-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          <div className={`form-group floating-label ${formData.email ? 'has-value' : ''} ${fieldErrors.email ? 'has-error' : ''}`}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <label htmlFor="email">Email Address</label>
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
          </div>
          <div className={`form-group floating-label ${formData.password ? 'has-value' : ''} ${fieldErrors.password ? 'has-error' : ''}`}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              required
              minLength={6}
            />
            <label htmlFor="password">Password</label>
            {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-login" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
      <BottomNav currentPage={2} totalPages={4} />
    </div>
  );
};

export default Login;
