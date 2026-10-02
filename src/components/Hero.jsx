import { ArrowRightIcon, StarIcon, ShieldCheckIcon, TruckIcon, RotateCcwIcon, HeadphonesIcon } from './Icons'
import { formatINR } from '../utils/formatCurrency'

export default function Hero({ onExploreClick, onSpecialOffersClick, onAddToCart, featuredProduct }) {
  return (
    <section className="hero-section" aria-label="Hero Introduction">
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="hero-container">
        {/* Left Column: Headline & CTA */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            <span>⚡ Grand Festive Drop: Up to 50% Off Luxury Brands</span>
          </div>

          <h1 className="hero-title">
            Smart Shopping, <br />
            <span className="gradient-text">Everyday Joy.</span>
          </h1>

          <p className="hero-description">
            Discover a curated collection of next-gen electronics, royal Mulberry silk couture, and handcrafted Italian boots — delivered across India with BlueDart Express.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={onExploreClick}>
              Explore Collection
              <ArrowRightIcon size={18} />
            </button>
            <button className="btn-secondary" onClick={onSpecialOffersClick}>
              🔥 View Flash Deals
            </button>
          </div>

          {/* Social Proof Mini */}
          <div className="hero-social-proof">
            <div className="avatar-group">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Customer avatar" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Customer avatar" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Customer avatar" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="Customer avatar" />
            </div>
            <div className="proof-text">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} size={14} />
                ))}
              </div>
              <p><strong>4.9/5 Rating</strong> from 18,500+ satisfied shoppers in India</p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Featured Card */}
        <div className="hero-visual">
          {featuredProduct && (
            <div className="hero-card-featured">
              <div className="featured-ribbon">⭐ Product of the Day</div>
              
              <div className="hero-img-box">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="hero-product-img"
                  loading="eager"
                />
                <span className="hero-discount-pill">-25% OFF</span>
              </div>

              <div className="hero-card-body">
                <div className="hero-card-meta">
                  <span className="card-cat-badge">{featuredProduct.category}</span>
                  <div className="card-rating">
                    <StarIcon size={14} />
                    <span>{featuredProduct.rating} ({featuredProduct.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="hero-card-name">{featuredProduct.name}</h3>
                
                <div className="hero-card-footer">
                  <div className="price-stack">
                    <span className="price-current">{formatINR(featuredProduct.price)}</span>
                    <span className="price-old">{formatINR(featuredProduct.originalPrice)}</span>
                  </div>
                  <button
                    className="btn-quick-add"
                    onClick={() => onAddToCart(featuredProduct)}
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>

              {/* Floating notification badge */}
              <div className="floating-stat-badge">
                <span className="stat-icon">🚚</span>
                <div>
                  <p className="stat-title">BlueDart Express</p>
                  <p className="stat-subtitle">All-India 48hr Dispatch</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges Strip */}
      <div className="trust-strip">
        <div className="trust-container">
          <div className="trust-item">
            <div className="trust-icon-box"><TruckIcon size={22} /></div>
            <div>
              <h4>Free Express Delivery</h4>
              <p>On all orders above ₹999 across India</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box"><ShieldCheckIcon size={22} /></div>
            <div>
              <h4>UPI, Cards & COD Available</h4>
              <p>Instant GPay, PhonePe, Paytm & NetBanking</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box"><RotateCcwIcon size={22} /></div>
            <div>
              <h4>7-Day Doorstep Returns</h4>
              <p>Zero questions asked refund guarantee</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon-box"><HeadphonesIcon size={22} /></div>
            <div>
              <h4>24/7 Dedicated Support</h4>
              <p>Live WhatsApp & Phone Assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
