import React from 'react'

const sedanBody = (palette) => (
  <g>
    <path
      d="M90 260 Q140 200 220 190 L470 190 Q550 200 610 240 Q640 250 640 280 L80 280 Q70 250 90 260 Z"
      fill={palette.body}
      stroke={palette.trim}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path
      d="M210 190 L320 150 H470 Q520 150 560 210 L210 210 Z"
      fill={palette.window}
      stroke={palette.trim}
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <path d="M120 260 H600" stroke={palette.trim} strokeWidth={6} strokeLinecap="round" opacity="0.6" />
    <path d="M150 235 H250" stroke={palette.highlight} strokeWidth={6} strokeLinecap="round" opacity="0.4" />
    <path d="M500 235 H570" stroke={palette.highlight} strokeWidth={6} strokeLinecap="round" opacity="0.4" />
    <path d="M340 190 H470" stroke={palette.accent} strokeWidth={6} strokeLinecap="round" opacity="0.5" />
    <path
      d="M90 260 Q140 210 220 205"
      stroke={palette.highlight}
      strokeWidth={4}
      strokeLinecap="round"
      opacity="0.35"
    />
    <rect x={250} y={205} width={60} height={35} rx={6} fill={palette.window} opacity={0.7} />
    <rect x={325} y={205} width={60} height={35} rx={6} fill={palette.window} opacity={0.65} />
  </g>
)

const suvBody = (palette) => (
  <g>
    <path
      d="M80 270 Q130 210 230 200 L520 200 Q610 205 650 250 Q670 265 660 295 H70 Q60 270 80 270 Z"
      fill={palette.body}
      stroke={palette.trim}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path
      d="M230 200 L340 160 H520 Q570 160 600 215 L230 220 Z"
      fill={palette.window}
      stroke={palette.trim}
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <rect x={260} y={220} width={70} height={40} rx={8} fill={palette.window} opacity={0.7} />
    <rect x={345} y={220} width={70} height={40} rx={8} fill={palette.window} opacity={0.65} />
    <rect x={430} y={220} width={90} height={42} rx={10} fill={palette.window} opacity={0.6} />
    <path d="M110 265 H620" stroke={palette.trim} strokeWidth={6} strokeLinecap="round" opacity="0.65" />
    <path d="M150 235 H260" stroke={palette.highlight} strokeWidth={6} strokeLinecap="round" opacity="0.4" />
    <path d="M470 235 H585" stroke={palette.highlight} strokeWidth={6} strokeLinecap="round" opacity={0.35} />
    <path d="M250 200 H520" stroke={palette.accent} strokeWidth={7} strokeLinecap="round" opacity={0.45} />
  </g>
)

const truckBody = (palette) => (
  <g>
    <path
      d="M70 270 L70 240 Q70 215 110 215 L220 215 Q240 215 250 205 L320 150 H520 Q560 150 575 165 L630 220 Q650 235 650 265 V285 L70 285 Z"
      fill={palette.body}
      stroke={palette.trim}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path
      d="M330 160 H500 Q530 160 545 175 L590 220 H330 Z"
      fill={palette.window}
      stroke={palette.trim}
      strokeWidth={3}
      strokeLinejoin="round"
    />
    <rect x={350} y={190} width={80} height={40} rx={6} fill={palette.window} opacity={0.7} />
    <rect x={440} y={190} width={70} height={40} rx={6} fill={palette.window} opacity={0.65} />
    <path d="M110 260 H620" stroke={palette.trim} strokeWidth={6} strokeLinecap="round" opacity="0.65" />
    <path d="M260 205 H520" stroke={palette.accent} strokeWidth={7} strokeLinecap="round" opacity={0.45} />
    <path d="M110 215 H220" stroke={palette.highlight} strokeWidth={5} strokeLinecap="round" opacity={0.35} />
  </g>
)

export const carModels = [
  {
    id: 'sedan',
    name: 'Urban Sedan',
    description: 'A sleek four-door profile with low roofline and subtle shoulder line.',
    defaultBodyColor: '#1f2937',
    defaultAccentColor: '#60a5fa',
    wheels: [
      { cx: 190, cy: 280, radius: 68 },
      { cx: 520, cy: 280, radius: 68 },
    ],
    renderBody: sedanBody,
  },
  {
    id: 'crossover',
    name: 'Adventure Crossover',
    description: 'Higher ride height with a confident stance and panoramic greenhouse.',
    defaultBodyColor: '#111827',
    defaultAccentColor: '#34d399',
    wheels: [
      { cx: 180, cy: 300, radius: 74 },
      { cx: 520, cy: 300, radius: 74 },
    ],
    renderBody: suvBody,
  },
  {
    id: 'truck',
    name: 'Crew Cab Truck',
    description: 'A muscular pickup silhouette with a spacious cab and utilitarian bed.',
    defaultBodyColor: '#1e293b',
    defaultAccentColor: '#f97316',
    wheels: [
      { cx: 190, cy: 305, radius: 78 },
      { cx: 540, cy: 305, radius: 78 },
    ],
    renderBody: truckBody,
  },
]
