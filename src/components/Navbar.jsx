import { useState } from 'react'
import { BagIcon, SearchIcon, HeartIcon, UserIcon, LogOutIcon, SparklesIcon, GiftIcon } from './Icons'

export default function Navbar({
  searchTerm,
  setSearchTerm,
  cartCount,
  onOpenCart,
  wishlistCount,
  activeCategory,
  onSelectCategory,
  categories,
  user,
  onOpenAuth,
  onLogout,
  onOpenSpinWheel,
}) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main Navigation">
        <div className="nav-container">
          {/* Brand Logo */}
          <a href="#" className="brand-logo" aria-label="ShopEasy Home">
            <div className="logo-icon-wrap">
              <BagIcon size={22} className="logo-icon" />
            </div>
            <div className="logo-text">
              Shop<span className="logo-accent">Easy</span>
            </div>
          </a>

          {/* Search Input */}
          <div className="search-bar-wrap">
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              id="search-products-input"
              placeholder="Search 4K audio, smartwatch, suede boots, decor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search products"
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search query"
              >
                ✕
              </button>
            )}
          </div>

          {/* Navigation Actions */}
          <div className="nav-actions">
            {/* Lucky Spin Wheel Action Button */}
            <button
              className="lucky-spin-nav-btn"
              onClick={onOpenSpinWheel}
              title="Spin & Win Secret Deals"
            >
              <GiftIcon size={18} />
              <span className="spin-btn-label">Spin & Win</span>
              <span className="spin-free-pill">FREE</span>
            </button>

            {/* Wishlist */}
            <div className="nav-action-item wishlist-pill" title="Saved Wishlist Items">
              <HeartIcon size={20} filled={wishlistCount > 0} />
              <span className="action-label">Wishlist</span>
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </div>

            {/* User Profile / Auth Button */}
            {user ? (
              <div className="user-menu-wrapper">
                <button
                  className="user-profile-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User Account Menu"
                >
                  <img src={user.avatar} alt={user.name} className="user-avatar-img" />
                  <span className="user-name-short">{user.name.split(' ')[0]}</span>
                  <span className="vip-dot"></span>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown-menu">
                    <div className="user-drop-header">
                      <img src={user.avatar} alt={user.name} className="drop-avatar" />
                      <div>
                        <strong>{user.name}</strong>
                        <p>{user.email}</p>
                        <span className="user-tier-badge">
                          <SparklesIcon size={12} /> {user.tier}
                        </span>
                      </div>
                    </div>
                    <div className="user-points-row">
                      <span>Loyalty Credits:</span>
                      <strong>{user.points} pts (₹1,500 Value)</strong>
                    </div>
                    <div className="user-drop-divider"></div>
                    <ul className="user-drop-list">
                      <li><a href="#orders">📦 My Orders & Tracking</a></li>
                      <li><a href="#rewards">🎁 VIP Rewards Center</a></li>
                      <li><a href="#settings">⚙️ Account Settings</a></li>
                    </ul>
                    <div className="user-drop-divider"></div>
                    <button
                      className="btn-dropdown-logout"
                      onClick={() => {
                        setShowUserMenu(false)
                        onLogout()
                      }}
                    >
                      <LogOutIcon size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn-nav-auth" onClick={onOpenAuth}>
                <UserIcon size={18} />
                <span>Sign In</span>
              </button>
            )}

            {/* Cart Trigger */}
            <button
              id="open-cart-btn"
              className="cart-trigger-btn"
              onClick={onOpenCart}
              aria-label={`Open shopping cart with ${cartCount} items`}
            >
              <BagIcon size={20} />
              <span className="cart-text">Cart</span>
              <span className="cart-badge-count">{cartCount}</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="category-bar">
          <div className="category-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
