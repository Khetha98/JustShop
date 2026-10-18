import { useEffect } from 'react'
import HomePage from './features/store/HomePage.jsx'
import SignInPage from './features/auth/SignInPage.jsx'
import SignUpPage from './features/auth/SignUpPage.jsx'

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const isHomePage = path === '/'
  const isSignInPage = path === '/sign-in'

  useEffect(() => {
    document.title = isHomePage
      ? 'JustShop | Thoughtful goods for everyday'
      : isSignInPage
        ? 'Sign in | JustShop'
        : 'Create your account | JustShop'
  }, [isHomePage, isSignInPage])

  if (isHomePage) return <HomePage />
  return isSignInPage ? <SignInPage /> : <SignUpPage />
}

export default App
