/* eslint-disable react-refresh/only-export-components */
import React from 'react'

const RimBase = ({ cx, cy, radius, innerRatio = 0.35, stroke = '#1f2937', fill = '#f3f4f6' }) => {
  const innerRadius = radius * innerRatio
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={radius} fill="#111827" opacity="0.92" />
      <circle r={radius * 0.92} fill={fill} stroke={stroke} strokeWidth={radius * 0.04} />
      <circle r={innerRadius} fill="#111827" stroke={stroke} strokeWidth={radius * 0.025} />
    </g>
  )
}

const ClassicFiveSpoke = ({ cx, cy, radius, accentColor }) => {
  const spokeWidth = radius * 0.18
  const innerRadius = radius * 0.35
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <RimBase cx={0} cy={0} radius={radius} fill="#e2e8f0" stroke="#0f172a" />
      {[0, 72, 144, 216, 288].map((angle) => (
        <rect
          key={angle}
          x={-spokeWidth / 2}
          y={innerRadius}
          width={spokeWidth}
          height={radius * 0.48}
          rx={spokeWidth / 2}
          fill={accentColor}
          transform={`rotate(${angle})`}
          opacity="0.92"
        />
      ))}
      <circle r={radius * 0.3} fill="#f8fafc" stroke="#1e293b" strokeWidth={radius * 0.03} />
      <circle r={radius * 0.08} fill="#94a3b8" />
    </g>
  )
}

const MeshPerformance = ({ cx, cy, radius, accentColor }) => {
  const innerRadius = radius * 0.38
  const spokes = []
  for (let i = 0; i < 10; i++) {
    const angle = (i * 36) / 2
    spokes.push(
      <polygon
        key={`mesh-${i}`}
        points={`0,${innerRadius} ${radius * 0.11},${radius * 0.65} -${radius * 0.11},${radius * 0.65}`}
        fill={accentColor}
        opacity="0.85"
        transform={`rotate(${angle})`}
      />,
    )
  }
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <RimBase cx={0} cy={0} radius={radius} fill="#f1f5f9" stroke="#020617" />
      {spokes}
      <circle r={innerRadius * 0.9} fill="#f8fafc" stroke="#334155" strokeWidth={radius * 0.035} />
      <circle r={radius * 0.08} fill="#94a3b8" />
    </g>
  )
}

const AeroSport = ({ cx, cy, radius, accentColor }) => {
  const bladeWidth = radius * 0.32
  const bladeHeight = radius * 0.7
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <RimBase cx={0} cy={0} radius={radius} fill="#e2e8f0" stroke="#020617" />
      {[0, 120, 240].map((angle) => (
        <path
          key={`blade-${angle}`}
          d={`M0 ${radius * 0.15} C ${bladeWidth / 2} ${bladeHeight * 0.1}, ${bladeWidth / 2} ${bladeHeight * 0.9}, 0 ${bladeHeight} C -${
            bladeWidth / 2
          } ${bladeHeight * 0.9}, -${bladeWidth / 2} ${bladeHeight * 0.1}, 0 ${radius * 0.15}`}
          fill={accentColor}
          opacity="0.88"
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r={radius * 0.28} fill="#f8fafc" stroke="#1f2937" strokeWidth={radius * 0.03} />
      <circle r={radius * 0.08} fill="#64748b" />
    </g>
  )
}

const TrackSplitSpoke = ({ cx, cy, radius, accentColor }) => {
  const innerRadius = radius * 0.34
  const spokeWidth = radius * 0.12
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <RimBase cx={0} cy={0} radius={radius} fill="#f8fafc" stroke="#111827" />
      {[0, 30, 60, 90, 120, 150].map((angle) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <rect
            x={-spokeWidth * 0.65}
            y={innerRadius}
            width={spokeWidth}
            height={radius * 0.48}
            rx={spokeWidth * 0.45}
            fill={accentColor}
            opacity="0.92"
          />
          <rect
            x={spokeWidth * -0.05}
            y={innerRadius}
            width={spokeWidth}
            height={radius * 0.48}
            rx={spokeWidth * 0.45}
            fill={accentColor}
            opacity="0.6"
          />
        </g>
      ))}
      <circle r={radius * 0.26} fill="#e2e8f0" stroke="#020617" strokeWidth={radius * 0.03} />
      <circle r={radius * 0.08} fill="#94a3b8" />
    </g>
  )
}

export const rimStyles = [
  {
    id: 'classic-five',
    name: 'Classic Five-Spoke',
    description: 'A timeless brushed alloy design that complements most factory paint colors.',
    accentColor: '#cbd5f5',
    render: (props) => <ClassicFiveSpoke {...props} />,
  },
  {
    id: 'mesh-performance',
    name: 'Mesh Performance',
    description: 'Dense cross-mesh pattern favored by performance sedans and coupes.',
    accentColor: '#cbd5e1',
    render: (props) => <MeshPerformance {...props} />,
  },
  {
    id: 'aero-sport',
    name: 'Aero Sport Disc',
    description: 'Wind-cheating aero blades for EVs and touring builds.',
    accentColor: '#e0f2fe',
    render: (props) => <AeroSport {...props} />,
  },
  {
    id: 'track-split',
    name: 'Track Split-Spoke',
    description: 'Aggressive split-spokes with deep concavity for a motorsport stance.',
    accentColor: '#c7d2fe',
    render: (props) => <TrackSplitSpoke {...props} />,
  },
]
