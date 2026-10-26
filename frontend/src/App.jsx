import { useEffect, useState } from 'react'
import HomePage from './features/store/HomePage.jsx'
import BagPage from './features/store/BagPage.jsx'
import CheckoutPage from './features/store/CheckoutPage.jsx'
import SignInPage from './features/auth/SignInPage.jsx'
import SignUpPage from './features/auth/SignUpPage.jsx'
import { api } from './api/client.js'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isHomePage = path === '/'
  const isBagPage = path === '/bag'
  const isCheckoutPage = path === '/checkout'
  const isSignInPage = path === '/sign-in'
  const [products, setProducts] = useState([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
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
          setProducts(responseProducts.map((product) => {
            return {
              ...product,
              detail: product.description || product.category || '',
              price: Number(product.price),
              image: product.imageUrl || '',
              imageAlt: product.description || product.name,
              color: 'moss',
            }
          }))
          setIsLoadingProducts(false)
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setCatalogError(error.message)
          setIsLoadingProducts(false)
        }
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

  if (isHomePage) return <HomePage cartItems={cartItems} setCartItems={setCartItems} products={products} isLoadingProducts={isLoadingProducts} catalogError={catalogError} />
  if (isBagPage) return <BagPage cartItems={cartItems} setCartItems={setCartItems} products={products} />
  if (isCheckoutPage) return (
    <CheckoutPage
      cartItems={cartItems}
      setCartItems={setCartItems}
      products={products}
      isLoadingProducts={isLoadingProducts}
      catalogError={catalogError}
    />
  )
  return isSignInPage ? <SignInPage /> : <SignUpPage />
}

export default App
