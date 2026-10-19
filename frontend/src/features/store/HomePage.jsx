import { useState } from 'react'
import './HomePage.css'

const products = [
  {
    id: 'field-tote',
    name: 'Field Day Tote',
    detail: 'Heavy cotton canvas · Moss',
    price: 'R38',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Natural canvas tote bag with everyday essentials',
    color: 'moss',
  },
  {
    id: 'daily-notebook',
    name: 'The Daily Notebook',
    detail: 'Recycled paper · Soft cover',
    price: 'R18',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Open notebook and pen beside a keyboard',
    color: 'oat',
  },
]

function HomePage() {
  const [bagCount, setBagCount] = useState(0)
  const [addedProduct, setAddedProduct] = useState('')

  function addToBag(productId) {
    setBagCount((count) => count + 1)
    setAddedProduct(productId)
  }

  return (
    <main className="storefront">
      <div className="announcement-bar">A little more considered. A little less ordinary.</div>

      <header className="store-header">
        <a className="store-brand" href="/" aria-label="JustShop home">JustShop<span>.</span></a>
        <nav className="store-nav" aria-label="Main navigation">
          <a className="nav-current" href="#shop">Shop</a>
          <a href="#story">Our story</a>
        </nav>
        <div className="store-actions">
          <a className="account-link" href="/sign-in">Sign in</a>
          <span className="bag-count" aria-live="polite" aria-label={`${bagCount} items in bag`}>
            Bag <span>{bagCount}</span>
          </span>
        </div>
      </header>

      <section className="store-intro" id="story">
        <div className="intro-copy">
          <p className="store-eyebrow"><span /> SMALL-BATCH EVERYDAY GOODS</p>
          <h1>Good things.<br /><em>Good, often.</em></h1>
          <p className="intro-description">Useful objects, made to be reached for every day.</p>
          <a className="intro-link" href="#shop">Meet the little collection <span aria-hidden="true">↓</span></a>
        </div>
        <div className="intro-image" role="img" aria-label="Sunlit shelves of thoughtfully made everyday goods">
          <span className="image-note">THE EVERYDAY EDIT <b>NO. 01</b></span>
        </div>
        <span className="intro-index" aria-hidden="true">01 / 02</span>
      </section>

      <section className="collection" id="shop" aria-labelledby="collection-title">
        <div className="collection-heading">
          <div>
            <p className="store-eyebrow">THE STARTING POINT</p>
            <h2 id="collection-title">A few good things</h2>
          </div>
          <p className="collection-note">Two keepers for your everyday.</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => {
            const isAdded = addedProduct === product.id

            return (
              <article className={`product product-${product.color}`} key={product.id}>
                <div className="product-image-wrap">
                  <img className="product-image" src={product.image} alt={product.imageAlt} />
                  <span className="product-number">0{index + 1}</span>
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-detail">{product.detail}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <span className="product-price">{product.price}</span>
                </div>
                <button className="add-button" type="button" onClick={() => addToBag(product.id)}>
                  <span>{isAdded ? 'Added to bag' : 'Add to bag'}</span>
                  <span className="add-button-icon" aria-hidden="true">{isAdded ? '✓' : '+'}</span>
                </button>
              </article>
            )
          })}
        </div>
        <p className="bag-feedback" role="status">
          {addedProduct ? `${products.find((product) => product.id === addedProduct)?.name} is in your bag.` : ''}
        </p>
      </section>

      <footer className="store-footer">
        <a className="store-brand footer-brand" href="/">JustShop<span>.</span></a>
        <p>Made for the everyday, and all the good bits in between.</p>
        <span>© 2026 JustShop Goods</span>
      </footer>
    </main>
  )
}

export default HomePage