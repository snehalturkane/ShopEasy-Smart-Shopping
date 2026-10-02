import { useState } from 'react'
import { CloseIcon, SparklesIcon, CheckIcon } from './Icons'

export default function SpinWheelModal({ isOpen, onClose, onApplyDiscount }) {
  const [spinning, setSpinning] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [prize, setPrize] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)

  if (!isOpen) return null

  const prizes = [
    { label: '35% OFF', code: 'LUXE35', color: '#4f46e5' },
    { label: '20% OFF', code: 'INDIA20', color: '#0ea5e9' },
    { label: '₹500 OFF', code: 'FESTIVE500', color: '#10b981' },
    { label: '₹1500 OFF', code: 'SAVE1500', color: '#f59e0b' },
    { label: '50% OFF', code: 'SEXY50', color: '#ef4444' },
    { label: 'FREE SHIP', code: 'FREESHIP', color: '#8b5cf6' },
  ]

  const handleSpin = () => {
    if (spinning || prize) return
    setSpinning(true)

    // Spin 4 to 6 full rotations plus a random slice
    const sliceCount = prizes.length
    const randomIndex = Math.floor(Math.random() * sliceCount)
    const extraRotations = 360 * 5
    const sliceAngle = 360 / sliceCount
    const finalAngle = extraRotations + (360 - (randomIndex * sliceAngle + sliceAngle / 2))

    setWheelRotation(finalAngle)

    setTimeout(() => {
      setSpinning(false)
      const wonPrize = prizes[randomIndex]
      setPrize(wonPrize)
      setShowConfetti(true)
      onApplyDiscount(wonPrize.code)
    }, 4000)
  }

  const handleClose = () => {
    setShowConfetti(false)
    setPrize(null)
    onClose()
  }

  return (
    <div className="wheel-backdrop" onClick={handleClose} role="dialog" aria-modal="true">
      {/* CSS Confetti Overlay */}
      {showConfetti && (
        <div className="confetti-container" aria-hidden="true">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1.5}s`,
                backgroundColor: ['#4f46e5', '#f59e0b', '#10b981', '#ef4444', '#ec4899', '#3b82f6'][
                  i % 6
                ],
              }}
            ></div>
          ))}
        </div>
      )}

      <div className="wheel-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="wheel-close-btn" onClick={handleClose} aria-label="Close modal">
          <CloseIcon size={20} />
        </button>

        <div className="wheel-header">
          <div className="wheel-badge">
            <SparklesIcon size={16} />
            <span>LUCKY VIP REWARD</span>
          </div>
          <h2 className="wheel-title">Spin & Unlock Secret Deals</h2>
          <p className="wheel-subtitle">
            Give the lucky prize wheel a spin to unlock guaranteed VIP discounts up to 50% off!
          </p>
        </div>

        {/* Wheel Apparatus */}
        <div className="wheel-stage">
          <div className="wheel-pointer">▼</div>

          <div
            className="wheel-circle"
            style={{
              transform: `rotate(${wheelRotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
            }}
          >
            {prizes.map((p, idx) => {
              const rotation = (360 / prizes.length) * idx
              return (
                <div
                  key={idx}
                  className="wheel-slice"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    background: p.color,
                  }}
                >
                  <span className="slice-label">{p.label}</span>
                </div>
              )
            })}
            <div className="wheel-hub">
              <span>🎁</span>
            </div>
          </div>
        </div>

        {/* Result & Actions */}
        {prize ? (
          <div className="wheel-win-box">
            <div className="win-badge">
              <CheckIcon size={20} />
            </div>
            <h3>BOOM! You Won {prize.label}!</h3>
            <p>
              Secret Code: <strong className="prize-code">{prize.code}</strong>
            </p>
            <p className="win-hint">This coupon has been automatically applied to your cart!</p>
            <button className="btn-primary" onClick={handleClose}>
              Claim & Go to Shop
            </button>
          </div>
        ) : (
          <button
            className={`btn-spin-now ${spinning ? 'spinning' : ''}`}
            onClick={handleSpin}
            disabled={spinning}
          >
            {spinning ? 'Spinning the Wheel...' : '🎲 SPIN THE WHEEL NOW'}
          </button>
        )}
      </div>
    </div>
  )
}
