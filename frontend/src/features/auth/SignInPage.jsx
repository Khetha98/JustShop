import { useState } from 'react'
import './SignUpPage.css'
import './SignInPage.css'

function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="signup-page">
      <section className="visual-panel" aria-label="JustShop store">
        <a className="brand brand-on-image" href="/sign-up" aria-label="JustShop home">
          JustShop<span>.</span>
        </a>
        <div className="visual-copy">
          <p className="eyebrow">GOOD THINGS, FOUND</p>
          <p className="visual-heading">Make room for<br />the everyday.</p>
          <p className="visual-caption">Thoughtful pieces for wherever life takes you.</p>
        </div>
        <span className="image-credit">A considered collection, made for living.</span>
      </section>

      <section className="form-panel" id="top">
        <header className="form-header">
          <a className="brand brand-on-light" href="/sign-up" aria-label="JustShop home">
            JustShop<span>.</span>
          </a>
          <p className="sign-in-prompt">New to JustShop? <a href="/sign-up">Create account</a></p>
        </header>

        <div className="form-content">
          <p className="eyebrow form-eyebrow">GOOD TO HAVE YOU BACK</p>
          <h1>Welcome back</h1>
          <p className="form-intro">Sign in to pick up where you left off.</p>

          {submitted ? (
            <div className="success-message" role="status">
              <span className="success-mark" aria-hidden="true">✓</span>
              <div>
                <h2>Welcome back.</h2>
                <p>You're signed in as {email}.</p>
              </div>
            </div>
          ) : (
            <form className="signup-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                onChange={(event) => setEmail(event.target.value)}
              />

              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Your password"
                  required
                />
                <button
                  className="password-toggle"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <a className="forgot-password" href="#forgot-password">Forgot password?</a>

              <button className="create-account-button" type="submit">
                Sign in <span aria-hidden="true">→</span>
              </button>
            </form>
          )}

          <p className="form-footnote">Your JustShop account, all in one place.</p>
        </div>

        <footer className="form-footer">
          <span>© 2026 JustShop Goods</span>
          <a href="#help">Need a hand?</a>
        </footer>
      </section>
    </main>
  )
}

export default SignInPage