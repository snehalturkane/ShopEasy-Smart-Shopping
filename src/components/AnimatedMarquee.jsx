export default function AnimatedMarquee() {
  const items = [
    { icon: '🔥', text: 'GRAND LUXURY SALE: Up to 50% OFF Top Electronics, Couture & Living' },
    { icon: '🚚', text: 'Free Express BlueDart Delivery Across India On Orders Above ₹999' },
    { icon: '⚡', text: 'Instant UPI 1-Click Payments: Google Pay, PhonePe, Paytm' },
    { icon: '💎', text: 'VIP Club Members: Earn 2X Loyalty Points On Every Order' },
    { icon: '⭐', text: 'Rated 4.9/5 By Over 18,500+ Satisfied Indian Shoppers' },
    { icon: '🎁', text: 'Use Code INDIA20 For Instant 20% Discount Sitewide' },
  ]

  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div className="marquee-track">
        {/* Render twice for seamless infinite looping */}
        {[...items, ...items].map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-icon">{item.icon}</span>
            <span className="marquee-text">{item.text}</span>
            <span className="marquee-dot">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}
