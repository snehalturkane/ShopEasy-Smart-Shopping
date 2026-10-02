import { useState, useEffect } from 'react'
import { CloseIcon, TrashIcon, BagIcon, CheckIcon } from './Icons'
import { formatINR } from '../utils/formatCurrency'

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess,
  appliedPromo,
  onApplyPromo,
}) {
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClose = () => {
    setOrderComplete(false)
    setIsCheckingOut(false)
    onClose()
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
  // Calculate discount based on applied promo
  let discount = 0
  if (appliedPromo === 'INDIA20' || appliedPromo === 'SPRING20') {
    discount = subtotal * 0.20
  } else if (appliedPromo === 'LUXE35' || appliedPromo === 'AUDIO35') {
    discount = subtotal * 0.35
  } else if (appliedPromo === 'SEXY50') {
    discount = subtotal * 0.50
  } else if (appliedPromo === 'SAVE1500' && subtotal >= 7999) {
    discount = 1500
  } else if (appliedPromo === 'FESTIVE500' && subtotal >= 2999) {
    discount = 500
  }

  const freeShippingThreshold = 999
  const freeShippingUnlocked = subtotal >= freeShippingThreshold || items.length === 0
  const shippingCost = (freeShippingUnlocked || appliedPromo === 'FREESHIP') ? 0 : 99
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal)
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100)

  const total = Math.max(0, subtotal - discount + shippingCost)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    const cleanCode = promoInput.trim().toUpperCase()
    if (!cleanCode) return

    const validCodes = ['INDIA20', 'LUXE35', 'SAVE1500', 'SEXY50', 'FESTIVE500', 'SPRING20', 'FREESHIP']
    if (validCodes.includes(cleanCode)) {
      if (cleanCode === 'SAVE1500' && subtotal < 7999) {
        setPromoError('SAVE1500 requires minimum cart value of ₹7,999')
        return
      }
      if (cleanCode === 'FESTIVE500' && subtotal < 2999) {
        setPromoError('FESTIVE500 requires minimum cart value of ₹2,999')
        return
      }
      onApplyPromo(cleanCode)
      setPromoError('')
      setPromoInput('')
    } else {
      setPromoError('Invalid coupon. Try INDIA20, LUXE35, or SAVE1500')
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => {
      setIsCheckingOut(false)
      setOrderId(`SE-IN-${Math.floor(100000 + Math.random() * 900000)}`)
      setOrderComplete(true)
      onClearCart()
      onCheckoutSuccess()
    }, 1200)
  }

  if (!isOpen) return null

  return (
    <div className="cart-backdrop" onClick={handleClose} role="dialog" aria-modal="true">
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-title-row">
            <BagIcon size={22} className="cart-title-icon" />
            <h3>Your Shopping Cart</h3>
            <span className="cart-badge-pill">
              {items.reduce((acc, it) => acc + it.quantity, 0)} items
            </span>
          </div>
          <button className="cart-close-btn" onClick={handleClose} aria-label="Close cart">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-banner">
          {freeShippingUnlocked ? (
            <p className="shipping-status-unlocked">
              🎉 <strong>Congratulations!</strong> You unlocked FREE BlueDart Express Shipping!
            </p>
          ) : (
            <p className="shipping-status-needed">
              Add <strong>{formatINR(amountNeeded)}</strong> more for <strong>FREE Express Delivery</strong> across India!
            </p>
          )}
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Body Content */}
        <div className="cart-drawer-body">
          {orderComplete ? (
            <div className="checkout-success-view">
              <div className="success-icon-wrap">
                <CheckIcon size={40} />
              </div>
              <h3>Order Placed Successfully!</h3>
              <p>
                Dhanyavaad! Your order <strong>#{orderId}</strong> is confirmed and will be dispatched within 24 hours. Tracking details sent via SMS & WhatsApp.
              </p>
              <div className="order-details-box">
                <p>Payment: <strong>{paymentMethod.toUpperCase()} Verified</strong></p>
                <p>Courier: <strong>BlueDart Air Express</strong></p>
              </div>
              <button className="btn-primary" onClick={handleClose}>
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="cart-empty-view">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any luxury pieces yet.</p>
              <button className="btn-primary" onClick={handleClose}>
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  
                  <div className="cart-item-meta">
                    <h4 className="cart-item-title">{item.name}</h4>
                    <span className="cart-item-price">{formatINR(item.price)}</span>
                    
                    <div className="cart-qty-row">
                      <div className="cart-qty-buttons">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="qty-num">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="btn-remove-item"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name} from cart`}
                        title="Remove item"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && !orderComplete && (
          <div className="cart-drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="promo-input-group">
              <input
                type="text"
                placeholder="Discount code (e.g. INDIA20)"
                value={promoInput}
                onChange={(e) => {
                  setPromoInput(e.target.value)
                  setPromoError('')
                }}
              />
              <button type="submit" className="btn-apply-promo">
                Apply
              </button>
            </form>
            {promoError && <p className="promo-error-msg">{promoError}</p>}
            {appliedPromo && (
              <p className="promo-success-msg">
                ✓ Coupon <strong>{appliedPromo}</strong> applied successfully!
              </p>
            )}

            {/* Indian Payment Method Selector */}
            <div className="payment-method-selector">
              <span className="pay-method-title">Pay With:</span>
              <div className="pay-method-pills">
                <button
                  type="button"
                  className={`pay-pill ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  ⚡ UPI (GPay/PhonePe)
                </button>
                <button
                  type="button"
                  className={`pay-pill ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  💳 Cards / NetBanking
                </button>
                <button
                  type="button"
                  className={`pay-pill ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  💵 Cash on Delivery
                </button>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="cart-calc-table">
              <div className="calc-row">
                <span>Subtotal:</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="calc-row discount-row">
                  <span>Special Discount:</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="calc-row">
                <span>Express Delivery:</span>
                <span>{shippingCost === 0 ? <strong className="text-green">FREE</strong> : formatINR(shippingCost)}</span>
              </div>
              <div className="calc-row total-row">
                <span>Total Amount:</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <button
              className="btn-checkout-now"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? 'Securing Transaction...' : `Pay ${formatINR(total)} via ${paymentMethod.toUpperCase()}`}
            </button>

            <p className="checkout-guarantee-note">
              🔒 100% RBI-Compliant 256-bit Encrypted UPI & Card Checkout
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
