import { useState, useEffect } from 'react'
import { CloseIcon, StarIcon, CheckIcon, HeartIcon } from './Icons'
import { formatINR } from '../utils/formatCurrency'

export default function ProductModal({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) {
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!product) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [product, onClose])

  if (!product) return null

  const handleAdd = () => {
    onAddToCart(product, quantity)
    onClose()
  }

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <CloseIcon size={20} />
        </button>

        <div className="modal-grid">
          {/* Product Image */}
          <div className="modal-image-col">
            <img src={product.image} alt={product.name} className="modal-img" />
            {discountPercent > 0 && (
              <span className="modal-discount-tag">Save {discountPercent}%</span>
            )}
          </div>

          {/* Details */}
          <div className="modal-details-col">
            <div className="modal-category">{product.category}</div>
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-rating-row">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={16} />
                ))}
              </div>
              <span className="modal-rating-score">
                {product.rating} ({product.reviewsCount} customer reviews)
              </span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">{formatINR(product.price)}</span>
              {product.originalPrice && (
                <span className="modal-price-old">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              <span className="stock-status-pill in-stock">● In Stock & Ready to Ship (All-India Express)</span>
            </div>

            <p className="modal-desc">{product.description}</p>

            {product.features && (
              <div className="modal-features-list">
                <h4>Key Highlights:</h4>
                <ul>
                  {product.features.map((feat, idx) => (
                    <li key={idx}>
                      <CheckIcon size={16} className="feature-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="modal-actions-box">
              <div className="quantity-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              <button className="btn-modal-add" onClick={handleAdd}>
                Add {quantity} to Cart • {formatINR(product.price * quantity)}
              </button>

              <button
                className={`btn-modal-wishlist ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
                title="Save to Wishlist"
              >
                <HeartIcon size={20} filled={isWishlisted} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
