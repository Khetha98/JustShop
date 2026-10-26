import './StoreHeader.css'

function StoreHeader({ bagCount, isBagPage = false, userName = null }) {
  return (
    <>
      <div className="announcement-bar">A little more considered. A little less ordinary.</div>
      <header className="store-header">
        <a className="store-brand" href="/" aria-label="JustShop home">JustShop<span>.</span></a>
        <nav className="store-nav" aria-label="Main navigation">
          <a className={!isBagPage ? 'nav-current' : ''} href={isBagPage ? '/#shop' : '#shop'}>Shop</a>
          <a href={isBagPage ? '/#story' : '#story'}>Our story</a>
        </nav>
        <div className="store-actions">
          {userName
            ? <span className="account-link account-name">Hi, {userName}</span>
            : <a className="account-link" href="/sign-in">Sign in</a>}
          <a className={`bag-count${isBagPage ? ' nav-current' : ''}`} href="/bag" aria-label={`Bag, ${bagCount} items`} aria-current={isBagPage ? 'page' : undefined}>
            Bag <span aria-live="polite">{bagCount}</span>
          </a>
        </div>
      </header>
    </>
  )
}

export default StoreHeader