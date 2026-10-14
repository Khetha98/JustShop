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