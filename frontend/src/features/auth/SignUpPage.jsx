import { useState } from 'react'
import './SignUpPage.css'

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [fullName, setFullName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="signup-page">
      <section className="visual-panel" aria-label="JustShop store">
        <a className="brand brand-on-image" href="#top" aria-label="JustShop home">
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
          <a className="brand brand-on-light" href="#top" aria-label="JustShop home">
            JustShop<span>.</span>
          </a>
          <p className="sign-in-prompt">Already a member? <a href="#sign-in">Sign in</a></p>
        </header>

        <div className="form-content">
          <p className="eyebrow form-eyebrow">A GOOD PLACE TO START</p>
          <h1>Create your account</h1>
          <p className="form-intro">Join us for considered finds and little things worth keeping.</p>

          {submitted ? (
            <div className="success-message" role="status">
              <span className="success-mark" aria-hidden="true">✓</span>
              <div>
                <h2>You're in, {fullName.split(' ')[0]}.</h2>
                <p>Your JustShop account is ready for its first good find.</p>
              </div>
            </div>
          ) : (
            <form className="signup-form" onSubmit={handleSubmit}>
              <label htmlFor="full-name">Full name</label>
              <input
                id="full-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
                onChange={(event) => setFullName(event.target.value)}
              />

              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />

              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  minLength={8}
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
              <p className="password-hint">Use at least 8 characters.</p>

              <label className="terms-check">
                <input type="checkbox" required />
                <span>I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.</span>
              </label>

              <button className="create-account-button" type="submit">
                Create account <span aria-hidden="true">→</span>
              </button>
            </form>
          )}

          <p className="form-footnote">Your email helps us manage your account. See our Privacy Policy for details.</p>
        </div>

        <footer className="form-footer">
          <span>© 2026 JustShop Goods</span>
          <a href="#help">Need a hand?</a>
        </footer>
      </section>
    </main>
  )
}

export default SignUpPage