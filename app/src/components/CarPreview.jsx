import './CarPreview.css'

const VIEWBOX = { width: 720, height: 420 }

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const adjustColor = (hex, amount) => {
  const normalizedAmount = clamp(amount, -1, 1)
  const sanitized = hex.replace('#', '')
  if (sanitized.length !== 6) return hex
  const num = parseInt(sanitized, 16)
  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff
  const transform = (channel) => {
    const delta = normalizedAmount < 0 ? channel * (1 + normalizedAmount) : channel + (255 - channel) * normalizedAmount
    return Math.round(clamp(delta, 0, 255))
  }
  const next = (transform(r) << 16) | (transform(g) << 8) | transform(b)
  return `#${next.toString(16).padStart(6, '0')}`
}

const CarPreview = ({ car, rim, bodyColor, accentColor, wheelScale }) => {
  if (!car || !rim) return null

  const palette = {
    body: bodyColor,
    accent: accentColor,
    highlight: adjustColor(bodyColor, 0.35),
    trim: adjustColor(bodyColor, -0.45),
    window: adjustColor(accentColor, 0.4),
    glassTint: adjustColor(bodyColor, 0.55),
  }

  return (
    <div className="preview-stage">
      <svg
        className="preview-canvas"
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        role="img"
        aria-labelledby="car-preview-title car-preview-desc"
      >
        <title id="car-preview-title">Vehicle preview with customizable rims</title>
        <desc id="car-preview-desc">
          Illustration of a {car.name} with {rim.name} rims applied to the wheels.
        </desc>
        <defs>
          <linearGradient id="previewSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={adjustColor(accentColor, 0.7)} stopOpacity="0.25" />
            <stop offset="60%" stopColor={adjustColor(bodyColor, 0.6)} stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="previewGround" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1f2937" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0b1120" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="wheelGlow" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor={adjustColor(accentColor, 0.6)} stopOpacity="0.18" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={VIEWBOX.width} height={VIEWBOX.height} fill="url(#previewSky)" />
        <rect x="0" y="300" width={VIEWBOX.width} height="140" fill="url(#previewGround)" />
        <path
          d="M0 320 C120 300 240 300 360 320 C480 340 600 340 720 320 L720 360 L0 360 Z"
          fill="#020617"
          opacity="0.35"
        />

        <g className="car-body" transform="translate(0, 20)">
          {car.renderBody({
            body: palette.body,
            accent: palette.accent,
            highlight: palette.highlight,
            trim: palette.trim,
            window: palette.window,
            glassTint: palette.glassTint,
          })}
        </g>

        <g className="car-wheels" transform="translate(0, 20)">
          {car.wheels.map((wheel, index) => {
            const scaledRadius = wheel.radius * wheelScale
            const rimRadius = scaledRadius * 0.78
            const accent = rim.accentColor || palette.accent
            return (
              <g key={`${car.id}-wheel-${index}`} className="car-wheel">
                <circle
                  cx={wheel.cx}
                  cy={wheel.cy}
                  r={scaledRadius}
                  fill="#0b1120"
                  stroke="#020617"
                  strokeWidth={scaledRadius * 0.08}
                />
                <circle cx={wheel.cx} cy={wheel.cy} r={scaledRadius * 1.15} fill="url(#wheelGlow)" />
                {rim.render({ cx: wheel.cx, cy: wheel.cy, radius: rimRadius, accentColor: accent })}
              </g>
            )
          })}
        </g>

        <g className="car-shadow" transform="translate(0, 20)">
          {car.wheels.map((wheel, index) => (
            <ellipse
              key={`shadow-${index}`}
              cx={wheel.cx}
              cy={wheel.cy + wheel.radius * 0.65}
              rx={wheel.radius * 1.05}
              ry={wheel.radius * 0.35}
              fill="#000"
              opacity="0.35"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default CarPreview
