import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useSEO from '../hooks/useSeo.jsx'
import './Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    if (submitError) {
      setSubmitError('')
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setSubmitError('')
    try {
      const result = await login(formData.username, formData.password)
      if (result.success) navigate('/', { replace: true })
      else setSubmitError(result.error)
    } catch {
      setSubmitError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {useSEO({
        title: "Hashye.online - Login to Your Account",
        description: "Sign in to your Hashye.online account to access your watchlist, continue streaming movies, and manage your preferences.",
        image: "/hashye-preview.png",
        url: "https://hashye.online/login",
      })}
      <div className="auth-page">
        <div className="container">
          <div className="auth-container">
            <div className="auth-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your Hashye.online account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
              {submitError && <div className="error-message">{submitError}</div>}
              
              <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`form-input ${errors.username ? 'error' : ''}`}
                  placeholder="Enter your username"
                  disabled={isLoading}
                />
                {errors.username && <span className="field-error">{errors.username}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                {errors.password && <span className="field-error">{errors.password}</span>}
              </div>
              
              <button
                type="submit"
                className="btn btn-primary auth-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner spinner-sm"></span>
                    Signing In...
                  </>
                ) : 'Sign In'}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">Sign up here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
