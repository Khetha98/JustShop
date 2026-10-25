import { useEffect, useState } from 'react'
import HomePage from './features/store/HomePage.jsx'
import BagPage from './features/store/BagPage.jsx'
import CheckoutPage from './features/store/CheckoutPage.jsx'
import SignInPage from './features/auth/SignInPage.jsx'
import SignUpPage from './features/auth/SignUpPage.jsx'
import { api } from './api/client.js'
import { products as sampleProducts } from './features/store/products.js'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isHomePage = path === '/'
  const isBagPage = path === '/bag'
  const isCheckoutPage = path === '/checkout'
  const isSignInPage = path === '/sign-in'
  const [products, setProducts] = useState(sampleProducts)
  const [catalogError, setCatalogError] = useState('')
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedItems = JSON.parse(window.localStorage.getItem('justshop-bag') || '[]')
      return Array.isArray(savedItems) ? savedItems : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem('justshop-bag', JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    let isCurrent = true

    api.getProducts()
      .then((responseProducts) => {
        if (!Array.isArray(responseProducts)) {
          throw new Error('The product service returned an unexpected response.')
        }

        if (isCurrent) {
          const productIdsByName = new Map(responseProducts.map((product) => [product.name, product.id]))
          const legacyProductIds = new Map(sampleProducts.map((product) => [
            product.id,
            productIdsByName.get(product.name),
          ]))
          setCartItems((items) => items.map((item) => {
            const migratedId = legacyProductIds.get(item.id)
            return migratedId === undefined ? item : { ...item, id: migratedId }
          }))
          setProducts(responseProducts.map((product) => {
            const sample = sampleProducts.find((item) => item.name === product.name)
            return {
              ...product,
              detail: product.description || product.category || '',
              price: Number(product.price),
              image: product.imageUrl || sample?.image || '',
              imageAlt: product.description || product.name,
              color: sample?.color || 'moss',
            }
          }))
        }
      })
      .catch((error) => {
        if (isCurrent) setCatalogError(error.message)
      })

    return () => {
      isCurrent = false
    }
  }, [])

  useEffect(() => {
    document.title = isHomePage
      ? 'JustShop | Thoughtful goods for everyday'
      : isBagPage
        ? 'Your bag | JustShop'
        : isCheckoutPage
          ? 'Checkout | JustShop'
          : isSignInPage
            ? 'Sign in | JustShop'
            : 'Create your account | JustShop'
  }, [isHomePage, isBagPage, isCheckoutPage, isSignInPage])

  if (isHomePage) return <HomePage cartItems={cartItems} setCartItems={setCartItems} products={products} catalogError={catalogError} />
  if (isBagPage) return <BagPage cartItems={cartItems} setCartItems={setCartItems} products={products} />
  if (isCheckoutPage) return <CheckoutPage cartItems={cartItems} setCartItems={setCartItems} products={products} />
  return isSignInPage ? <SignInPage /> : <SignUpPage />
}

export default App
