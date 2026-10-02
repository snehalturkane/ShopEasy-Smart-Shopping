import { StarIcon, HeartIcon } from './Icons'
import { formatINR } from '../utils/formatCurrency'

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
}) {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return (
    <div className="product-card" id={`product-${product.id}`}>
      {/* Card Header & Badges */}
      <div className="product-image-container">
        {product.badge && (
          <span className={`product-badge badge-${product.badge.toLowerCase().replace(/\s+/g, '-')}`}>
            {product.badge}
          </span>
        )}

        {discountPercent > 0 && (
          <span className="discount-badge">-{discountPercent}%</span>
        )}

        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => onToggleWishlist(product.id)}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <HeartIcon size={18} filled={isWishlisted} />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="product-thumbnail"
          loading="lazy"
        />

        {/* Hover overlay quick actions */}
        <div className="image-hover-overlay">
          <button
            className="quick-view-btn"
            onClick={() => onQuickView(product)}
            aria-label={`Quick view details for ${product.name}`}
          >
            👁️ Quick View
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="product-info">
        <div className="product-category-row">
          <span className="product-cat-name">{product.category}</span>
          <div className="rating-pill">
            <StarIcon size={13} />
            <span className="rating-num">{product.rating}</span>
            <span className="rating-count">({product.reviewsCount})</span>
          </div>
        </div>

        <h3 className="product-title" title={product.name}>
          {product.name}
        </h3>

        <p className="product-desc-snippet">{product.description}</p>

        {/* Price & Add to Cart */}
        <div className="product-bottom-row">
          <div className="price-container">
            <span className="price-tag">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="price-original">{formatINR(product.originalPrice)}</span>
            )}
          </div>

          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
            aria-label={`Add ${product.name} to shopping cart`}
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
