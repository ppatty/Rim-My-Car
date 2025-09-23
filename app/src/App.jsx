import { useEffect, useMemo, useState } from 'react'
import CarPreview from './components/CarPreview'
import { carModels } from './data/carModels'
import { rimStyles } from './data/rimStyles'
import './App.css'

const environments = [
  {
    id: 'studio',
    name: 'Studio Midnight',
    description: 'Controlled lighting that emphasizes rim design and paint reflections.',
    chip: '#60a5fa',
    tokens: {
      '--shell-background': 'radial-gradient(circle at 20% 10%, #1f2937 0%, #0f172a 58%, #010409 100%)',
      '--panel-surface': 'rgba(15, 23, 42, 0.72)',
      '--panel-border': 'rgba(148, 163, 184, 0.18)',
      '--panel-shadow': 'rgba(2, 6, 23, 0.35)',
      '--preview-overlay':
        'radial-gradient(circle at 30% 20%, rgba(148, 163, 184, 0.25), transparent 55%), radial-gradient(circle at 70% 10%, rgba(59, 130, 246, 0.18), transparent 52%), linear-gradient(160deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.72) 60%, rgba(15, 23, 42, 0.85) 100%)',
      '--preview-border': 'rgba(148, 163, 184, 0.18)',
      '--preview-shadow': 'rgba(15, 23, 42, 0.55)',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset Overlook',
    description: 'Warm dusk ambience to evaluate how the wheels pop outdoors.',
    chip: '#f59e0b',
    tokens: {
      '--shell-background': 'linear-gradient(145deg, #2a1a47 0%, #1b2357 45%, #0b172e 100%)',
      '--panel-surface': 'rgba(30, 27, 75, 0.72)',
      '--panel-border': 'rgba(252, 211, 77, 0.28)',
      '--panel-shadow': 'rgba(88, 28, 135, 0.38)',
      '--preview-overlay':
        'radial-gradient(circle at 20% 10%, rgba(249, 115, 22, 0.25), transparent 55%), radial-gradient(circle at 75% 15%, rgba(249, 168, 212, 0.18), transparent 52%), linear-gradient(165deg, rgba(30, 27, 75, 0.92) 0%, rgba(17, 24, 39, 0.82) 68%, rgba(10, 12, 19, 0.92) 100%)',
      '--preview-border': 'rgba(252, 211, 77, 0.28)',
      '--preview-shadow': 'rgba(88, 28, 135, 0.4)',
    },
  },
  {
    id: 'neon',
    name: 'Neon Garage',
    description: 'High-contrast lighting that highlights polished and dark finishes.',
    chip: '#a855f7',
    tokens: {
      '--shell-background': 'linear-gradient(135deg, #150b2d 0%, #130d3c 45%, #020617 100%)',
      '--panel-surface': 'rgba(17, 24, 39, 0.78)',
      '--panel-border': 'rgba(192, 132, 252, 0.32)',
      '--panel-shadow': 'rgba(126, 34, 206, 0.38)',
      '--preview-overlay':
        'radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.22), transparent 55%), radial-gradient(circle at 75% 20%, rgba(59, 130, 246, 0.2), transparent 50%), linear-gradient(160deg, rgba(17, 24, 39, 0.92) 0%, rgba(15, 23, 42, 0.8) 60%, rgba(5, 10, 25, 0.92) 100%)',
      '--preview-border': 'rgba(192, 132, 252, 0.26)',
      '--preview-shadow': 'rgba(67, 56, 202, 0.42)',
    },
  },
]

const SummaryIcon = ({ type }) => {
  const common = { width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6 }
  switch (type) {
    case 'car':
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 14h16l-1-4.5a2 2 0 0 0-2-1.5H7a2 2 0 0 0-2 1.5L4 14Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 16.5h-.5A1.5 1.5 0 0 1 3 15v-1a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v1a1.5 1.5 0 0 1-1.5 1.5H19" strokeLinecap="round" />
          <circle cx="7.5" cy="16.5" r="1.5" />
          <circle cx="16.5" cy="16.5" r="1.5" />
        </svg>
      )
    case 'rim':
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 5v3M12 16v3M19 12h-3M8 12H5M16.3 7.7l-2.1 2.1M9.8 14.2l-2.1 2.1M16.3 16.3l-2.1-2.1M9.8 9.8 7.7 7.7" />
        </svg>
      )
    case 'size':
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 20V4m0 0 4 4M6 4l-4 4M18 4v16m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    case 'paint':
    default:
      return (
        <svg {...common} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12c2.5-4.5 5.5-7 8-7s5.5 2.5 8 7c-2.5 4.5-5.5 7-8 7s-5.5-2.5-8-7Z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2.2" />
        </svg>
      )
  }
}

const formatWheelScale = (value) => {
  const percent = Math.round(value * 100)
  return `${percent}% of stock diameter`
}

function App() {
  const [selectedCarId, setSelectedCarId] = useState(carModels[0].id)
  const [selectedRimId, setSelectedRimId] = useState(rimStyles[0].id)
  const [bodyColor, setBodyColor] = useState(carModels[0].defaultBodyColor)
  const [accentColor, setAccentColor] = useState(carModels[0].defaultAccentColor)
  const [wheelScale, setWheelScale] = useState(1)
  const [environmentId, setEnvironmentId] = useState(environments[0].id)

  useEffect(() => {
    const activeCar = carModels.find((model) => model.id === selectedCarId)
    if (!activeCar) return
    setBodyColor(activeCar.defaultBodyColor)
    setAccentColor(activeCar.defaultAccentColor)
    setWheelScale(1)
  }, [selectedCarId])

  const selectedCar = useMemo(() => carModels.find((model) => model.id === selectedCarId), [selectedCarId])
  const selectedRim = useMemo(() => rimStyles.find((style) => style.id === selectedRimId), [selectedRimId])
  const environment = useMemo(() => environments.find((env) => env.id === environmentId) ?? environments[0], [environmentId])

  const appTokens = environment.tokens

  return (
    <div className="app-shell" style={appTokens}>
      <header className="app-header">
        <h1>Rim My Car</h1>
        <p>
          Uploading rims to your build can be a costly guess. Explore curated vehicle silhouettes, paint matches, and rim
          styles to lock in your look before placing the order.
        </p>
      </header>

      <main className="app-main">
        <section className="control-panel" aria-label="Configurator controls">
          <div className="panel-section" aria-labelledby="vehicle-heading">
            <header>
              <h2 id="vehicle-heading">Vehicle silhouette</h2>
              <p>Select the model that most closely matches your vehicle&apos;s proportions.</p>
            </header>
            <div className="option-grid">
              {carModels.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  className={`option-card ${selectedCarId === model.id ? 'active' : ''}`}
                  onClick={() => setSelectedCarId(model.id)}
                  aria-pressed={selectedCarId === model.id}
                >
                  <h3>{model.name}</h3>
                  <span>{model.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="panel-section" aria-labelledby="color-heading">
            <header>
              <h2 id="color-heading">Paint match</h2>
              <p>Dial in the base color of the body and an accent tone for trim and lighting.</p>
            </header>
            <div className="color-group">
              <div className="color-input">
                <label htmlFor="body-color">Body</label>
                <input
                  id="body-color"
                  type="color"
                  value={bodyColor}
                  onChange={(event) => setBodyColor(event.target.value)}
                  aria-label="Body paint color"
                />
                <span className="color-value">{bodyColor}</span>
              </div>
              <div className="color-input">
                <label htmlFor="accent-color">Accent</label>
                <input
                  id="accent-color"
                  type="color"
                  value={accentColor}
                  onChange={(event) => setAccentColor(event.target.value)}
                  aria-label="Accent lighting color"
                />
                <span className="color-value">{accentColor}</span>
              </div>
            </div>
          </div>

          <div className="panel-section" aria-labelledby="rim-heading">
            <header>
              <h2 id="rim-heading">Rim catalog</h2>
              <p>Preview different spoke patterns and finishes to find your perfect set.</p>
            </header>
            <div className="rim-grid">
              {rimStyles.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  className={`rim-card ${selectedRimId === style.id ? 'active' : ''}`}
                  onClick={() => setSelectedRimId(style.id)}
                  aria-pressed={selectedRimId === style.id}
                >
                  <svg viewBox="0 0 96 96" role="img" aria-label={`${style.name} rim preview`}>
                    {style.render({ cx: 48, cy: 48, radius: 34, accentColor: style.accentColor })}
                  </svg>
                  <strong>{style.name}</strong>
                  <span>{style.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="panel-section" aria-labelledby="fitment-heading">
            <header>
              <h2 id="fitment-heading">Fitment</h2>
              <p>Adjust wheel diameter to match your desired stance and tire profile.</p>
            </header>
            <div className="slider-group">
              <label htmlFor="wheel-scale">Wheel scale</label>
              <input
                id="wheel-scale"
                type="range"
                min="0.85"
                max="1.2"
                step="0.01"
                value={wheelScale}
                onChange={(event) => setWheelScale(Number(event.target.value))}
                aria-valuemin={0.85}
                aria-valuemax={1.2}
                aria-valuenow={wheelScale}
              />
              <span className="slider-value">{formatWheelScale(wheelScale)}</span>
            </div>
          </div>

          <div className="panel-section" aria-labelledby="environment-heading">
            <header>
              <h2 id="environment-heading">Environment</h2>
              <p>Select a lighting setup to evaluate how the rims react to different ambiences.</p>
            </header>
            <div className="environment-options">
              {environments.map((env) => (
                <button
                  key={env.id}
                  type="button"
                  className={`environment-chip ${environmentId === env.id ? 'active' : ''}`}
                  onClick={() => setEnvironmentId(env.id)}
                  aria-pressed={environmentId === env.id}
                  style={{ '--chip-preview': env.chip }}
                >
                  {env.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="preview-panel" aria-label="Vehicle preview">
          <div className="preview-wrapper">
            {selectedCar && selectedRim && (
              <CarPreview
                car={selectedCar}
                rim={selectedRim}
                bodyColor={bodyColor}
                accentColor={accentColor}
                wheelScale={wheelScale}
              />
            )}
          </div>
          <div className="preview-summary" aria-live="polite">
            <div className="summary-chip">
              <SummaryIcon type="car" />
              <span>{selectedCar?.name}</span>
            </div>
            <div className="summary-chip">
              <SummaryIcon type="rim" />
              <span>{selectedRim?.name}</span>
            </div>
            <div className="summary-chip">
              <SummaryIcon type="size" />
              <span>{formatWheelScale(wheelScale)}</span>
            </div>
            <div className="summary-chip">
              <SummaryIcon type="paint" />
              <span>
                {bodyColor.toUpperCase()} body · {accentColor.toUpperCase()} accents
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
