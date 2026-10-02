import { useState, useEffect, useMemo } from 'react'
import { PRODUCTS, SPECIAL_OFFERS, TESTIMONIALS } from './data/products'
import AnimatedMarquee from './components/AnimatedMarquee'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PromoBannerAd from './components/PromoBannerAd'
import SpecialOffers from './components/SpecialOffers'
import PriceFilterBar from './components/PriceFilterBar'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal'
import CartDrawer from './components/CartDrawer'
import AuthModal from './components/AuthModal'
import SpinWheelModal from './components/SpinWheelModal'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import Toast from './components/Toast'
import './App.css'

export default function App() {
  // Authentication state
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('shopeasy_user')
      if (savedUser) return JSON.parse(savedUser)
      // Default to VIP demo user
      return {
        name: 'Alex Morgan',
        email: 'alex.vip@shopeasy.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        tier: 'Platinum VIP',
        points: 850,
      }
    } catch {
      return null
    }
  })

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false)

  // Search & Filtering state
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(20000)
  const [onlyDeals, setOnlyDeals] = useState(false)

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopeasy_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopeasy_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [appliedPromo, setAppliedPromo] = useState('INDIA20')
  const [toast, setToast] = useState(null)

  // Persist user
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('shopeasy_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('shopeasy_user')
      }
    } catch (e) {
      console.error(e)
    }
  }, [user])

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('shopeasy_cart', JSON.stringify(cart))
    } catch (e) {
      console.error(e)
    }
  }, [cart])

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('shopeasy_wishlist', JSON.stringify(wishlist))
    } catch (e) {
      console.error(e)
    }
  }, [wishlist])

  // Feedback notifications
  const showToast = (message, type = 'success', icon = '✨') => {
    setToast({ message, type, icon })
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev))
    }, 3200)
  }

  // Categories list
  const categories = useMemo(() => {
    return ['All', ...new Set(PRODUCTS.map((p) => p.category))]
  }, [])

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = item.price <= maxPrice
      const matchesDeal = !onlyDeals || item.isSpecialOffer

      return matchesCategory && matchesSearch && matchesPrice && matchesDeal
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })
  }, [activeCategory, searchTerm, sortBy, maxPrice, onlyDeals])

  // Auth actions
  const handleLoginSuccess = (userData) => {
    setUser(userData)
    showToast(`Welcome, ${userData.name}! VIP perks unlocked.`, 'success', '💎')
  }

  const handleLogout = () => {
    setUser(null)
    showToast('You have been signed out.', 'info', '👋')
  }

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
        },
      ]
    })
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart!`, 'success', '🛒')
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
    showToast('Item removed from cart', 'info', '🗑️')
  }

  const handleClearCart = () => {
    setCart([])
  }

  // Wishlist toggle
  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from wishlist', 'info', '🤍')
        return prev.filter((id) => id !== productId)
      } else {
        showToast('Added to your wishlist!', 'success', '❤️')
        return [...prev, productId]
      }
    })
  }

  // Promo code copy handler
  const handleCopyCoupon = (code) => {
    setAppliedPromo(code)
    showToast(`Coupon ${code} copied & applied to your cart!`, 'success', '🏷️')
  }

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setActiveCategory('All')
    setMaxPrice(20000)
    setOnlyDeals(false)
    setSortBy('featured')
  }

  return (
    <div className="app-container">
      {/* Animated Marquee Top Banner */}
      <AnimatedMarquee />

      {/* Top Navigation */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        categories={categories}
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenSpinWheel={() => setIsSpinWheelOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('featured-products')}
          onSpecialOffersClick={() => scrollToSection('special-offers')}
          onAddToCart={handleAddToCart}
          featuredProduct={PRODUCTS[0]}
        />

        {/* Sexy Animated Ad Banner with Lucky Wheel Trigger */}
        <PromoBannerAd onOpenSpinWheel={() => setIsSpinWheelOpen(true)} />

        {/* Special Offers & Promo Codes */}
        <SpecialOffers
          offers={SPECIAL_OFFERS}
          onCopyCoupon={handleCopyCoupon}
        />

        {/* Featured Products Section with Interactive Price Slider */}
        <section id="featured-products" className="products-section" aria-label="Featured Products">
          <div className="section-container">
            {/* Header */}
            <div className="products-section-header">
              <div>
                <div className="section-pill">
                  <span>⚡ Handpicked Storefront</span>
                </div>
                <h2 className="section-title">
                  {activeCategory === 'All' ? 'Featured Collection' : `${activeCategory} Collection`}
                </h2>
                <p className="section-subtitle">
                  Showing {filteredProducts.length} premium item{filteredProducts.length === 1 ? '' : 's'} with real-time price & category filtering.
                </p>
              </div>

              {/* Sort Dropdown */}
              <div className="products-controls">
                <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                <div className="select-wrap">
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured">Featured / Trending</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interactive Price & Deals Filter Bar */}
            <PriceFilterBar
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              onlyDeals={onlyDeals}
              setOnlyDeals={setOnlyDeals}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              categories={categories}
              totalResults={filteredProducts.length}
              onResetFilters={handleResetFilters}
            />

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={setQuickViewProduct}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="no-products-found">
                <div className="empty-icon">🔍</div>
                <h3>No products match your criteria</h3>
                <p>Try moving the price slider up or clearing active filters to see all available items.</p>
                <button
                  className="btn-primary"
                  onClick={handleResetFilters}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials testimonials={TESTIMONIALS} />

        {/* Newsletter Signup */}
        <Newsletter
          onSubscribeSuccess={(email) =>
            showToast(`VIP discount voucher sent to ${email}!`, 'success', '🎉')
          }
        />
      </main>

      {/* Footer */}
      <Footer onCategoryClick={(cat) => {
        setActiveCategory(cat)
        scrollToSection('featured-products')
      }} />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        appliedPromo={appliedPromo}
        onApplyPromo={(code) => {
          setAppliedPromo(code)
          showToast(`Coupon ${code} applied successfully!`, 'success', '🏷️')
        }}
        onCheckoutSuccess={() => {
          showToast('Order completed! Express tracking link sent.', 'success', '🚀')
        }}
      />

      {/* Quick View Product Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* User Login & Register Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Interactive Lucky Prize Wheel Modal */}
      <SpinWheelModal
        isOpen={isSpinWheelOpen}
        onClose={() => setIsSpinWheelOpen(false)}
        onApplyDiscount={(code) => {
          setAppliedPromo(code)
          showToast(`Secret code ${code} unlocked & saved to your cart!`, 'success', '🎉')
        }}
      />

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}
