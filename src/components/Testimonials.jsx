import { StarIcon, CheckIcon } from './Icons'

export default function Testimonials({ testimonials }) {
  return (
    <section className="testimonials-section" aria-label="Customer Reviews">
      <div className="section-container">
        <div className="section-center-head">
          <div className="section-pill">
            <StarIcon size={14} />
            <span>Loved by 12,000+ Happy Customers</span>
          </div>
          <h2 className="section-title">What Our Shoppers Say</h2>
          <p className="section-subtitle">
            Real feedback from verified buyers who enjoy shopping with ShopEasy every day.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((review) => (
            <div key={review.id} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon key={i} size={16} />
                ))}
              </div>

              <p className="testimonial-quote">"{review.comment}"</p>

              <div className="testimonial-author-row">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="testimonial-avatar"
                  loading="lazy"
                />
                <div className="testimonial-author-info">
                  <h4 className="author-name">{review.name}</h4>
                  <div className="author-role-badge">
                    <CheckIcon size={12} className="verified-check" />
                    <span>{review.role}</span>
                  </div>
                  <span className="author-purchased">Purchased: {review.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
