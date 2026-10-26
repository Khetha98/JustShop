import { useState } from 'react'
import StoreHeader from './StoreHeader.jsx'
import { formatPrice } from './products.js'
import { api, getAuthToken } from '../../api/client.js'
import './CheckoutPage.css'

function CheckoutPage({ cartItems, setCartItems, products, isLoadingProducts, catalogError }) {
  const [order, setOrder] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const isSignedIn = Boolean(getAuthToken())
  const checkoutItems = cartItems
    .map((item) => ({ ...item, product: products.find((product) => String(product.id) === String(item.id)) }))
    .filter((item) => item.product)
  const hasUnavailableItems = checkoutItems.length !== cartItems.length
  const hasInvalidItems = checkoutItems.some(({ product, quantity }) => (
    !Number.isSafeInteger(Number(product.id))
    || Number(product.id) <= 0
    || !Number.isSafeInteger(quantity)
    || quantity <= 0
  ))
  const itemCount = checkoutItems.reduce((count, item) => count + item.quantity, 0)
  const subtotal = checkoutItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setIsSubmitting(true)
    setError('')

    try {
      if (hasUnavailableItems || hasInvalidItems) {
        throw new Error('Your bag contains an unavailable or invalid product. Update your bag before placing the order.')
      }

      const response = await api.checkout({
        checkoutDto: {
          email: formData.get('email'),
          phone: formData.get('phone'),
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          streetAddress: formData.get('address'),
          apartment: formData.get('addressExtra'),
          suburb: formData.get('suburb'),
          city: formData.get('city'),
          province: formData.get('province'),
          postalCode: formData.get('postalCode'),
        },
        items: checkoutItems.map(({ product, quantity }) => ({
          productId: Number(product.id),
          quantity,
        })),
      })
      if (!response || typeof response !== 'object' || response.id == null) {
        throw new Error('The backend returned an invalid order response.')
      }

      setOrder(response)
      setCartItems([])
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
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

        {order ? (
          <section className="checkout-confirmation" role="status" aria-live="polite">
            <span className="confirmation-mark" aria-hidden="true">✓</span>
            <p className="store-eyebrow">ORDER RECEIVED</p>
            <h2>Thanks, your order is in.</h2>
            <p>Order #{order.id} was created with status {order.orderStatus}. Payment has not been processed.</p>
            <a className="checkout-submit" href="/">Continue shopping</a>
          </section>
        ) : isLoadingProducts ? (
          <div className="checkout-empty" role="status">
            <p>Loading your bag…</p>
          </div>
        ) : catalogError ? (
          <div className="checkout-empty" role="alert">
            <p>Could not load product details: {catalogError}</p>
            <a className="checkout-submit" href="/bag">Return to your bag</a>
          </div>
        ) : checkoutItems.length === 0 ? (
          <div className="checkout-empty">
            <p>Your bag is empty.</p>
            <a className="checkout-submit" href="/#shop">Explore the collection</a>
          </div>
        ) : hasUnavailableItems || hasInvalidItems ? (
          <div className="checkout-empty" role="alert">
            <p>Your bag contains products that can’t be checked out.</p>
            <a className="checkout-submit" href="/bag">Review your bag</a>
          </div>
        ) : !isSignedIn ? (
          <section className="checkout-empty">
            <p>Sign in to place your order.</p>
            <a className="checkout-submit" href="/sign-in?returnTo=%2Fcheckout">Sign in to continue</a>
          </section>
        ) : (
          <div className="checkout-layout">
            <form className="delivery-form" onSubmit={handleSubmit}>
              {error && <p className="checkout-error" role="alert">{error}</p>}
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
              <button
                className="checkout-submit"
                type="submit"
                disabled={isSubmitting || hasUnavailableItems || hasInvalidItems}
              >
                {isSubmitting ? 'Placing order…' : 'Place order'} <span aria-hidden="true">→</span>
              </button>
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