import { useState, useEffect } from 'react'
import { CloseIcon, UserIcon, LockIcon, MailIcon, EyeIcon, SparklesIcon } from './Icons'

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setIsLoading(false)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      const userData = {
        name: formData.name || (isRegister ? 'New VIP Shopper' : 'Alex Morgan'),
        email: formData.email || 'alex.vip@shopeasy.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        tier: 'Platinum VIP',
        points: 850,
      }
      onLoginSuccess(userData)
      onClose()
    }, 900)
  }

  const handleDemoLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      const demoUser = {
        name: 'Jordan Stone',
        email: 'jordan.stone@vip.shopeasy.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        tier: 'Diamond Elite',
        points: 1250,
      }
      onLoginSuccess(demoUser)
      onClose()
    }, 600)
  }

  return (
    <div className="auth-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-glow-orbit"></div>

        <button className="auth-close-btn" onClick={onClose} aria-label="Close modal">
          <CloseIcon size={20} />
        </button>

        {/* Modal Header */}
        <div className="auth-header">
          <div className="auth-icon-badge">
            <SparklesIcon size={24} />
          </div>
          <h2 className="auth-title">
            {isRegister ? 'Create Your VIP Account' : 'Welcome Back to ShopEasy'}
          </h2>
          <p className="auth-sub">
            {isRegister
              ? 'Unlock member discounts, priority delivery, and exclusive rewards.'
              : 'Sign in to access your saved wishlist, orders, and VIP member perks.'}
          </p>

          {/* Tab Switcher */}
          <div className="auth-tabs">
            <button
              type="button"
              className={`auth-tab ${!isRegister ? 'active' : ''}`}
              onClick={() => setIsRegister(false)}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab ${isRegister ? 'active' : ''}`}
              onClick={() => setIsRegister(true)}
            >
              Join VIP Club
            </button>
          </div>
        </div>

        {/* 1-Click Fast Demo Login Pill */}
        <div className="demo-login-callout">
          <div>
            <strong>⚡ Quick Evaluation:</strong>
            <p>Test the full logged-in experience with 1-click</p>
          </div>
          <button type="button" className="btn-demo-login" onClick={handleDemoLogin}>
            Sign in as VIP Demo
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {isRegister && (
            <div className="auth-field">
              <label>Full Name</label>
              <div className="auth-input-wrap">
                <UserIcon size={18} className="field-icon" />
                <input
                  type="text"
                  placeholder="e.g. Alex Morgan"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label>Email Address</label>
            <div className="auth-input-wrap">
              <MailIcon size={18} className="field-icon" />
              <input
                type="email"
                placeholder="your.email@domain.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="auth-field">
            <div className="field-label-row">
              <label>Password</label>
              {!isRegister && <a href="#forgot" className="forgot-link">Forgot password?</a>}
            </div>
            <div className="auth-input-wrap">
              <LockIcon size={18} className="field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="pwd-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                <EyeIcon size={16} />
              </button>
            </div>
          </div>

          <button type="submit" className="btn-auth-submit" disabled={isLoading}>
            {isLoading ? (
              <span className="spinner-text">Authenticating...</span>
            ) : isRegister ? (
              'Create VIP Account'
            ) : (
              'Sign In to Account'
            )}
          </button>
        </form>

        {/* Social Logins */}
        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="social-auth-grid">
          <button type="button" className="social-auth-btn" onClick={handleDemoLogin}>
            <span className="social-icon-g">G</span>
            <span>Google</span>
          </button>
          <button type="button" className="social-auth-btn" onClick={handleDemoLogin}>
            <span></span>
            <span>Apple</span>
          </button>
          <button type="button" className="social-auth-btn" onClick={handleDemoLogin}>
            <span>GitHub</span>
          </button>
        </div>

        <p className="auth-disclaimer">
          By signing in you agree to ShopEasy's <strong>Terms of Service</strong> & <strong>Privacy Policy</strong>.
        </p>
      </div>
    </div>
  )
}
