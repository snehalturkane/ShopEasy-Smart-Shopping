import { SparklesIcon, ArrowRightIcon } from './Icons'

export default function PromoBannerAd({ onOpenSpinWheel }) {
  return (
    <section className="banner-ad-section" aria-label="Special Interactive Promotion">
      <div className="section-container">
        <div className="banner-ad-card">
          <div className="ad-glow-layer-1"></div>
          <div className="ad-glow-layer-2"></div>

          <div className="ad-content-grid">
            <div className="ad-text-block">
              <div className="ad-pill">
                <SparklesIcon size={14} />
                <span>HOT INTERACTIVE EVENT</span>
              </div>
              <h3 className="ad-headline">
                Unlock Today's <span className="ad-accent-text">VIP Mystery Voucher</span>
              </h3>
              <p className="ad-subtext">
                Spin our secret prize wheel to score instant coupon codes up to 50% OFF, free express shipping, or bonus loyalty credits.
              </p>
              <div className="ad-features-row">
                <span className="ad-perk-item">⚡ 100% Win Rate</span>
                <span className="ad-perk-item">🏷️ Stackable Discounts</span>
                <span className="ad-perk-item">🔒 Exclusive for Members</span>
              </div>
            </div>

            <div className="ad-action-block">
              <div className="wheel-preview-card">
                <div className="wheel-preview-icon">🎡</div>
                <div className="wheel-preview-text">
                  <strong>Lucky Mystery Wheel</strong>
                  <span>1 Free Spin Available</span>
                </div>
              </div>

              <button className="btn-ad-spin" onClick={onOpenSpinWheel}>
                <span>Spin to Win Now</span>
                <ArrowRightIcon size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
