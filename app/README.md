# Rim My Car (Vite + React)

This directory contains the React front-end for the Rim My Car configurator. It was bootstrapped with Vite and customized to let you preview different rim styles on a selection of vehicle silhouettes.

## Scripts

```bash
npm run dev      # Start the development server with hot reload
npm run build    # Generate a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint with the default Vite configuration
```

## Key folders

- `src/components` – reusable UI pieces such as the SVG preview canvas.
- `src/data` – datasets that describe the vehicle silhouettes and rim renderings.
- `src/App.jsx` – the main configurator UI.

To modify or add new rims/vehicles, edit the files in `src/data` and update the relevant JSX.
