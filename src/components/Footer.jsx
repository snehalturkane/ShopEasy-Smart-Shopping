import { BagIcon } from './Icons'

export default function Footer({ onCategoryClick }) {
  return (
    <footer className="footer-wrap" aria-label="Site Footer">
      <div className="section-container">
        <div className="footer-grid">
          {/* Col 1: Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <div className="logo-icon-wrap">
                <BagIcon size={20} className="logo-icon" />
              </div>
              <span className="logo-text">
                Shop<span className="logo-accent">Easy</span>
              </span>
            </div>
            <p className="footer-brand-desc">
              Your trusted online destination for premium gadgets, lifestyle upgrades, and everyday essentials with lightning-fast delivery and top-notch customer support.
            </p>
            <div className="footer-social-row">
              <a href="#twitter" aria-label="Twitter" className="social-link">𝕏</a>
              <a href="#instagram" aria-label="Instagram" className="social-link">📷</a>
              <a href="#facebook" aria-label="Facebook" className="social-link">📘</a>
              <a href="#youtube" aria-label="YouTube" className="social-link">▶</a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div className="footer-col">
            <h4 className="footer-col-title">Shop Categories</h4>
            <ul className="footer-links">
              <li><button onClick={() => onCategoryClick('Electronics')}>Electronics & Audio</button></li>
              <li><button onClick={() => onCategoryClick('Fashion')}>Fashion & Footwear</button></li>
              <li><button onClick={() => onCategoryClick('Home & Living')}>Home & Living</button></li>
              <li><button onClick={() => onCategoryClick('Lifestyle')}>Everyday Lifestyle</button></li>
              <li><button onClick={() => onCategoryClick('All')}>All Products</button></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="footer-col">
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#tracking">Track Your Order</a></li>
              <li><a href="#shipping">Shipping & Delivery</a></li>
              <li><a href="#returns">30-Day Returns Policy</a></li>
              <li><a href="#faq">Frequently Asked Questions</a></li>
              <li><a href="#support">24/7 Live Helpdesk</a></li>
            </ul>
          </div>

          {/* Col 4: Trust & Payments */}
          <div className="footer-col">
            <h4 className="footer-col-title">Safe & Indian Payments</h4>
            <p className="footer-trust-text">
              100% RBI-compliant 256-bit SSL encrypted payments with instant refunds.
            </p>
            <div className="payment-badges-row">
              <span className="pay-badge">UPI / GPAY</span>
              <span className="pay-badge">PHONEPE</span>
              <span className="pay-badge">PAYTM</span>
              <span className="pay-badge">RUPAY</span>
              <span className="pay-badge">NETBANKING</span>
              <span className="pay-badge">VISA / MC</span>
              <span className="pay-badge">CASH ON DELIVERY</span>
            </div>
            <p className="guarantee-badge">✓ Express Delivery via BlueDart & Delhivery</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} ShopEasy Inc. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
