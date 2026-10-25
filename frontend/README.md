# JustShop Frontend

React storefront built with Vite.

## Source Layout

- `src/main.jsx` boots the React application.
- `src/App.jsx` composes application-level screens.
- `src/features/` contains feature-owned pages, components, and styles.
- `src/index.css` contains global styles and design tokens.
- `src/assets/` contains imported static assets.

Add new flows under their owning feature directory. Move UI into `src/components/` when it is shared across features.

## Commands

- `npm run dev` starts the Vite development server.
- `npm run build` creates a production build.
- `npm run lint` runs Oxlint.

## Backend integration

The frontend calls the backend's `/api` endpoints through the Vite development proxy, which targets `http://localhost:9091` by default. Set `VITE_BACKEND_URL` to change the proxy target. For a deployed frontend, set `VITE_API_BASE_URL` to the backend API base URL (for example, `https://api.example.com/api`).

Product data is loaded from `GET /api/products`. Sign-up and sign-in use `POST /api/auth/register` and `POST /api/auth/login`; the returned JWT is stored in local storage and sent as a bearer token on authenticated requests. Checkout sends the bag items and delivery details to `POST /api/orders/checkout`. The bag itself remains in local storage because the current backend cart-add endpoint does not persist items.