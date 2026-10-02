import { useState } from 'react'
import { CheckIcon } from './Icons'

export default function Newsletter({ onSubscribeSuccess }) {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubscribed(true)
      onSubscribeSuccess(email)
    }, 700)
  }

  return (
    <section className="newsletter-section" aria-label="Newsletter Signup">
      <div className="section-container">
        <div className="newsletter-card">
          <div className="newsletter-glow"></div>

          <div className="newsletter-content">
            <span className="newsletter-tag">🎁 Exclusive Member Perk</span>
            <h2 className="newsletter-title">
              Unlock 15% Off Your First Order
            </h2>
            <p className="newsletter-subtitle">
              Join 45,000+ smart shoppers. Receive private sale access, secret discounts, and new product drop notifications straight to your inbox.
            </p>

            {isSubscribed ? (
              <div className="newsletter-success-box">
                <div className="success-badge-icon">
                  <CheckIcon size={24} />
                </div>
                <div>
                  <h4>You're on the VIP list!</h4>
                  <p>Check your inbox at <strong>{email}</strong> for your 15% discount voucher.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="newsletter-input-group">
                  <input
                    type="email"
                    id="newsletter-email-input"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address for newsletter"
                  />
                  <button
                    type="submit"
                    className="newsletter-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Joining...' : 'Claim 15% Off'}
                  </button>
                </div>
                <p className="newsletter-note">
                  🔒 We respect your privacy. No spam ever. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
