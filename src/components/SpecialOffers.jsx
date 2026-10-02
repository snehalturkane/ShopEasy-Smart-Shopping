import { useState, useEffect } from 'react'
import { TagIcon, CheckIcon } from './Icons'

export default function SpecialOffers({ offers, onCopyCoupon }) {
  // Dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 48,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const [copiedCode, setCopiedCode] = useState(null)

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code)
    setCopiedCode(code)
    onCopyCoupon(code)
    setTimeout(() => {
      setCopiedCode(null)
    }, 2500)
  }

  const formatNumber = (num) => String(num).padStart(2, '0')

  return (
    <section id="special-offers" className="offers-section" aria-label="Special Offers">
      <div className="section-container">
        {/* Section Header with Live Countdown */}
        <div className="offers-header-row">
          <div>
            <div className="section-pill">
              <TagIcon size={16} />
              <span>Limited Time Promotions</span>
            </div>
            <h2 className="section-title">Special Offers & Flash Vouchers</h2>
            <p className="section-subtitle">
              Exclusive discounts available for today only. Apply the promo code at checkout to claim your savings.
            </p>
          </div>

          <div className="countdown-box">
            <span className="countdown-label">🔥 Flash Deals End In:</span>
            <div className="timer-display">
              <div className="timer-unit">
                <span className="timer-value">{formatNumber(timeLeft.hours)}</span>
                <span className="timer-sub">Hours</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-unit">
                <span className="timer-value">{formatNumber(timeLeft.minutes)}</span>
                <span className="timer-sub">Mins</span>
              </div>
              <span className="timer-sep">:</span>
              <div className="timer-unit">
                <span className="timer-value">{formatNumber(timeLeft.seconds)}</span>
                <span className="timer-sub">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Cards Grid */}
        <div className="offers-grid">
          {offers.map((offer) => {
            const isCopied = copiedCode === offer.code
            return (
              <div
                key={offer.id}
                className="offer-card"
                style={{ background: offer.accentColor }}
              >
                <div className="offer-tag">{offer.tag}</div>
                <div className="offer-discount">{offer.discount}</div>
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-sub">{offer.subtitle}</p>

                <div className="coupon-action-row">
                  <div className="coupon-code-pill">
                    <span className="code-label">CODE:</span>
                    <strong className="code-val">{offer.code}</strong>
                  </div>

                  <button
                    className={`copy-code-btn ${isCopied ? 'copied' : ''}`}
                    onClick={() => handleCopy(offer.code)}
                    aria-label={`Copy coupon code ${offer.code}`}
                  >
                    {isCopied ? (
                      <>
                        <CheckIcon size={16} /> Copied!
                      </>
                    ) : (
                      'Copy Code'
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
