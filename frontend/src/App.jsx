import { useEffect, useState } from 'react'
import HomePage from './features/store/HomePage.jsx'
import BagPage from './features/store/BagPage.jsx'
import SignInPage from './features/auth/SignInPage.jsx'
import SignUpPage from './features/auth/SignUpPage.jsx'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isHomePage = path === '/'
  const isBagPage = path === '/bag'
  const isSignInPage = path === '/sign-in'
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
    document.title = isHomePage
      ? 'JustShop | Thoughtful goods for everyday'
      : isBagPage
        ? 'Your bag | JustShop'
        : isSignInPage
          ? 'Sign in | JustShop'
          : 'Create your account | JustShop'
  }, [isHomePage, isBagPage, isSignInPage])

  if (isHomePage) return <HomePage cartItems={cartItems} setCartItems={setCartItems} />
  if (isBagPage) return <BagPage cartItems={cartItems} setCartItems={setCartItems} />
  return isSignInPage ? <SignInPage /> : <SignUpPage />
}

export default App
