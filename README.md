# Rim My Car

Rim My Car lets you visualize how different wheel designs look on a curated set of vehicle silhouettes before placing an order. Choose the body style closest to your own build, dial in paint colors, explore multiple rim patterns and adjust the wheel scale in real time.

## Features

- **Vehicle silhouettes** – Switch between sedan, crossover, and truck inspired body shapes with lighting cues that highlight contours.
- **Paint matching** – Pick custom body and accent colors using intuitive color inputs to approximate your vehicle&apos;s finish.
- **Rim catalog** – Preview four hand-crafted rim renderings ranging from classic five-spoke to aero disc and motorsport mesh.
- **Fitment control** – Slide the wheel size between 85% and 120% of stock to experiment with stance and tire upgrades.
- **Lighting environments** – Toggle between studio, sunset, and neon garage scenes to evaluate how finishes react to different lighting.

## Getting started

The app lives in the [`app`](./app) directory and is built with [Vite](https://vitejs.dev/) and React.

```bash
cd app
npm install
npm run dev
```

The development server will print a local URL. Open it in your browser to interact with the configurator.

## Available scripts

Run these commands from the `app` folder:

- `npm run dev` – start a local development server with hot module replacement.
- `npm run build` – create a production build in the `dist` folder.
- `npm run preview` – serve the production build locally.
- `npm run lint` – run ESLint using the default Vite React configuration.

## Project structure

```
app/
├── public/              # Static assets
├── src/
│   ├── components/      # UI components such as the preview canvas
│   ├── data/            # Vehicle and rim configuration data
│   ├── App.jsx          # Root application component
│   ├── App.css          # Layout and styling for the configurator
│   └── index.css        # Global styles and resets
└── package.json         # Scripts and dependencies
```

## Customization tips

- Adjust the rim and vehicle datasets in `src/data/` to add new options or tweak proportions.
- Update the environment definitions in `src/App.jsx` to add more lighting scenarios or change the visual theme.
- Car silhouettes are rendered as SVG paths; modifying them allows you to represent different vehicle types or trim levels.

Enjoy exploring new wheel setups before you commit to the real thing!
