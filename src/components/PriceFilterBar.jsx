import { SlidersIcon } from './Icons'
import { formatINR } from '../utils/formatCurrency'

export default function PriceFilterBar({
  maxPrice,
  setMaxPrice,
  onlyDeals,
  setOnlyDeals,
  activeCategory,
  onSelectCategory,
  categories,
  totalResults,
  onResetFilters,
}) {
  return (
    <div className="filter-bar-card">
      <div className="filter-bar-top">
        <div className="filter-title-group">
          <SlidersIcon size={18} className="filter-icon" />
          <span className="filter-heading">Filters & Pricing</span>
          <span className="results-count-pill">{totalResults} Items</span>
        </div>

        <button className="btn-reset-filters" onClick={onResetFilters}>
          Reset All
        </button>
      </div>

      <div className="filter-controls-grid">
        {/* Price Slider */}
        <div className="filter-slider-box">
          <div className="slider-label-row">
            <span>Budget Cap:</span>
            <strong className="slider-price-val">{formatINR(maxPrice)}</strong>
          </div>
          <input
            type="range"
            min="1500"
            max="20000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-range-slider"
          />
          <div className="range-bounds">
            <span>₹1,500</span>
            <span>₹20,000+</span>
          </div>
        </div>

        {/* On Sale / Deals Toggle Switch */}
        <div className="filter-deal-toggle">
          <label className="deal-switch-label">
            <span className="deal-label-text">
              🔥 <strong>Special Deals Only</strong>
            </span>
            <div className="toggle-switch-wrapper">
              <input
                type="checkbox"
                checked={onlyDeals}
                onChange={(e) => setOnlyDeals(e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-slider"></span>
            </div>
          </label>
        </div>

        {/* Quick Category Buttons */}
        <div className="filter-quick-cats">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-cat-chip ${activeCategory === cat ? 'selected' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
