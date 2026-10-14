import { useEffect } from 'react'
import SignInPage from './features/auth/SignInPage.jsx'
import SignUpPage from './features/auth/SignUpPage.jsx'

function App() {
  const isSignInPage = window.location.pathname.replace(/\/+$/, '') === '/sign-in'

  useEffect(() => {
    document.title = isSignInPage ? 'Sign in | JustShop' : 'Create your account | JustShop'
  }, [isSignInPage])

  return isSignInPage ? <SignInPage /> : <SignUpPage />
}

export default App
