import StoreHeader from './StoreHeader.jsx'
import { formatPrice } from './products.js'
import './BagPage.css'

function BagPage({ cartItems, setCartItems, products }) {
  const bagProducts = cartItems
    .map((item) => ({ ...item, product: products.find((product) => String(product.id) === String(item.id)) }))
    .filter((item) => item.product)
  const itemCount = bagProducts.reduce((count, item) => count + item.quantity, 0)
  const subtotal = bagProducts.reduce((total, item) => total + item.product.price * item.quantity, 0)

  function updateQuantity(productId, change) {
    setCartItems((items) => items
      .map((item) => String(item.id) === String(productId) ? { ...item, quantity: item.quantity + change } : item)
      .filter((item) => item.quantity > 0))
  }

  function removeProduct(productId) {
    setCartItems((items) => items.filter((item) => String(item.id) !== String(productId)))
  }

  return (
    <main className="bag-page">
      <StoreHeader bagCount={itemCount} isBagPage />
      <section className="bag-content" aria-labelledby="bag-title">
        <div className="bag-heading">
          <p className="store-eyebrow">YOUR EVERYDAY EDIT</p>
          <h1 id="bag-title">Your bag <span>({itemCount})</span></h1>
        </div>

        {bagProducts.length === 0 ? (
          <div className="bag-empty">
            <p>Your bag is taking a little breather.</p>
            <a className="bag-continue" href="/#shop">Explore the collection <span aria-hidden="true">→</span></a>
          </div>
        ) : (
          <div className="bag-layout">
            <div className="bag-items">
              {bagProducts.map(({ product, quantity }) => (
                <article className="bag-item" key={product.id}>
                  <img src={product.image} alt={product.imageAlt} />
                  <div className="bag-item-info">
                    <p>{product.detail}</p>
                    <h2>{product.name}</h2>
                    <div className="bag-item-controls">
                      <div className="quantity-control" aria-label={`${product.name} quantity`}>
                        <button type="button" onClick={() => updateQuantity(product.id, -1)} aria-label={`Decrease ${product.name} quantity`}>−</button>
                        <span aria-live="polite">{quantity}</span>
                        <button type="button" onClick={() => updateQuantity(product.id, 1)} aria-label={`Increase ${product.name} quantity`}>+</button>
                      </div>
                      <button className="remove-item" type="button" onClick={() => removeProduct(product.id)}>Remove</button>
                    </div>
                  </div>
                  <span className="bag-item-price">{formatPrice(product.price * quantity)}</span>
                </article>
              ))}
              <a className="bag-continue" href="/#shop">← Continue shopping</a>
            </div>

            <aside className="bag-summary" aria-label="Order summary">
              <h2>Order summary</h2>
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p>Shipping and taxes calculated at checkout.</p>
              <a className="checkout-button" href="/checkout">Continue to checkout</a>
            </aside>
          </div>
        )}
      </section>
      <footer className="store-footer">
        <a className="store-brand footer-brand" href="/">JustShop<span>.</span></a>
        <p>Made for the everyday, and all the good bits in between.</p>
        <span>© 2026 JustShop Goods</span>
      </footer>
    </main>
  )
}

export default BagPage