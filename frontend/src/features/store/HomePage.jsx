import { useState } from 'react'
import StoreHeader from './StoreHeader.jsx'
import { formatPrice } from './products.js'
import './HomePage.css'

function HomePage({ cartItems, setCartItems, products, isLoadingProducts, catalogError }) {
  const [addedProduct, setAddedProduct] = useState('')
  const bagCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  function addToBag(productId) {
    setCartItems((items) => {
      const existingItem = items.find((item) => String(item.id) === String(productId))
      return existingItem
        ? items.map((item) => String(item.id) === String(productId) ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { id: productId, quantity: 1 }]
    })
    setAddedProduct(productId)
  }

  return (
    <main className="storefront">
      <StoreHeader bagCount={bagCount} />

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

        {isLoadingProducts && <p className="catalog-warning" role="status">Loading products…</p>}
        {catalogError && <p className="catalog-warning" role="alert">Could not load products: {catalogError}</p>}

        <div className="product-grid">
          {products.map((product, index) => {
            const isAdded = addedProduct === product.id

            return (
              <article className={`product product-${product.color}`} key={product.id}>
                <div className="product-image-wrap">
                  {product.image && <img className="product-image" src={product.image} alt={product.imageAlt} />}
                  <span className="product-number">0{index + 1}</span>
                </div>
                <div className="product-info">
                  <div>
                    <p className="product-detail">{product.detail}</p>
                    <h3>{product.name}</h3>
                  </div>
                  <span className="product-price">{formatPrice(product.price)}</span>
                </div>
                <button className="add-button" type="button" onClick={() => addToBag(product.id)}>
                  <span>{isAdded ? 'Added to bag' : 'Add to bag'}</span>
                  <span className="add-button-icon" aria-hidden="true">{isAdded ? '✓' : '+'}</span>
                </button>
              </article>
            )
          })}
        </div>
        {!isLoadingProducts && !catalogError && products.length === 0 && (
          <p className="catalog-warning">There are no products available right now.</p>
        )}
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