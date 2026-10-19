import { useState } from 'react'
import StoreHeader from './StoreHeader.jsx'
import { formatPrice, products } from './products.js'
import './CheckoutPage.css'

function CheckoutPage({ cartItems }) {
  const [submittedName, setSubmittedName] = useState('')
  const checkoutItems = cartItems
    .map((item) => ({ ...item, product: products.find((product) => product.id === item.id) }))
    .filter((item) => item.product)
  const itemCount = checkoutItems.reduce((count, item) => count + item.quantity, 0)
  const subtotal = checkoutItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setSubmittedName(formData.get('firstName'))
  }

  return (
    <main className="checkout-page">
      <StoreHeader bagCount={itemCount} isBagPage />
      <section className="checkout-content" aria-labelledby="checkout-title">
        <div className="checkout-heading">
          <p className="store-eyebrow">ALMOST YOURS</p>
          <h1 id="checkout-title">Checkout</h1>
          <a href="/bag">← Back to your bag</a>
        </div>

        {checkoutItems.length === 0 ? (
          <div className="checkout-empty">
            <p>Your bag is empty.</p>
            <a className="checkout-submit" href="/#shop">Explore the collection</a>
          </div>
        ) : submittedName ? (
          <section className="checkout-confirmation" role="status" aria-live="polite">
            <span className="confirmation-mark" aria-hidden="true">✓</span>
            <p className="store-eyebrow">CHECKOUT PREVIEW</p>
            <h2>Thanks, {submittedName}.</h2>
            <p>Your delivery details are ready. This demo does not send an order or process a payment, and your bag is saved.</p>
            <a className="checkout-submit" href="/bag">Return to your bag</a>
          </section>
        ) : (
          <div className="checkout-layout">
            <form className="delivery-form" onSubmit={handleSubmit}>
              <fieldset>
                <legend>Contact details</legend>
                <div className="checkout-field-grid">
                  <label>
                    Email address
                    <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                  </label>
                  <label>
                    Phone number
                    <input name="phone" type="tel" autoComplete="tel" placeholder="082 123 4567" required />
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Delivery address</legend>
                <div className="checkout-field-grid">
                  <label>
                    First name
                    <input name="firstName" type="text" autoComplete="given-name" required />
                  </label>
                  <label>
                    Last name
                    <input name="lastName" type="text" autoComplete="family-name" required />
                  </label>
                  <label className="checkout-field-wide">
                    Street address
                    <input name="address" type="text" autoComplete="street-address" required />
                  </label>
                  <label className="checkout-field-wide">
                    Apartment, suite, etc. <span>(optional)</span>
                    <input name="addressExtra" type="text" autoComplete="address-line2" />
                  </label>
                  <label>
                    Suburb
                    <input name="suburb" type="text" autoComplete="address-level3" required />
                  </label>
                  <label>
                    City
                    <input name="city" type="text" autoComplete="address-level2" required />
                  </label>
                  <label>
                    Province
                    <select name="province" autoComplete="address-level1" defaultValue="" required>
                      <option value="" disabled>Select province</option>
                      <option>Eastern Cape</option>
                      <option>Free State</option>
                      <option>Gauteng</option>
                      <option>KwaZulu-Natal</option>
                      <option>Limpopo</option>
                      <option>Mpumalanga</option>
                      <option>Northern Cape</option>
                      <option>North West</option>
                      <option>Western Cape</option>
                    </select>
                  </label>
                  <label>
                    Postal code
                    <input name="postalCode" type="text" inputMode="numeric" autoComplete="postal-code" required />
                  </label>
                </div>
              </fieldset>

              <div className="payment-notice">
                <strong>Payment</strong>
                <p>Payment is not available in this preview. No card details will be requested.</p>
              </div>
              <button className="checkout-submit" type="submit">Review checkout <span aria-hidden="true">→</span></button>
            </form>

            <aside className="checkout-summary" aria-label="Order summary">
              <h2>Your order <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span></h2>
              <ul>
                {checkoutItems.map(({ product, quantity }) => (
                  <li key={product.id}>
                    <img src={product.image} alt="" />
                    <div>
                      <strong>{product.name}</strong>
                      <span>Qty {quantity}</span>
                    </div>
                    <b>{formatPrice(product.price * quantity)}</b>
                  </li>
                ))}
              </ul>
              <div className="checkout-subtotal"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p>Shipping and taxes are not included in this preview.</p>
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

export default CheckoutPage