import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/authService';
import BottomNav from '../components/BottomNav';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: 'No'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
  };

  const validateForm = () => {
    const errors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }

    // Phone Number validation
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number (10-15 digits)';
    }

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
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? value : value
    });
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: ''
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
      const response = await signupUser(formData);
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/profile');
      } else {
        setError(response.message || 'Signup failed');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">
          Create <span className="highlight-word">your</span> PopX account
        </h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className={`form-group floating-label ${formData.fullName ? 'has-value' : ''} ${fieldErrors.fullName ? 'has-error' : ''}`} style={{ marginTop: '5px' }}>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Marry Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <label htmlFor="fullName">Full Name*</label>
            {fieldErrors.fullName && <span className="field-error">{fieldErrors.fullName}</span>}
          </div>
          <div className={`form-group floating-label ${formData.phoneNumber ? 'has-value' : ''} ${fieldErrors.phoneNumber ? 'has-error' : ''}`}>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Marry Doe"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <label htmlFor="phoneNumber">Phone number*</label>
            {fieldErrors.phoneNumber && <span className="field-error">{fieldErrors.phoneNumber}</span>}
          </div>
          <div className={`form-group floating-label ${formData.email ? 'has-value' : ''} ${fieldErrors.email ? 'has-error' : ''}`}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Marry Doe"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email address*</label>
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
          </div>
          <div className={`form-group floating-label ${formData.password ? 'has-value' : ''} ${fieldErrors.password ? 'has-error' : ''}`}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Marry Doe"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            <label htmlFor="password">Password*</label>
            {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
          </div>
          <div className={`form-group floating-label ${formData.companyName ? 'has-value' : ''}`}>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Marry Doe"
              value={formData.companyName}
              onChange={handleChange}
            />
            <label htmlFor="companyName">Company name</label>
          </div>
          <div className="form-group radio-group">
            <label>Are you an Agency?</label>
            <div className="radio-buttons">
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  value="Yes"
                  checked={formData.isAgency === 'Yes'}
                  onChange={handleChange}
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="isAgency"
                  value="No"
                  checked={formData.isAgency === 'No'}
                  onChange={handleChange}
                />
                <span>No</span>
              </label>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-signup" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
      <BottomNav currentPage={3} totalPages={4} />
    </div>
  );
};

export default Signup;
