import { FC } from 'react'

export interface IProps {
  size: number
  coordinates: number[][]
}

export const Path: FC<IProps> = ({ coordinates, size }) => {
  if (!coordinates.length) return null

  const points = coordinates.map(([col, row]) => {
    const GAP = 12
    return {
      x: col * (size + GAP) + size / 2,
      y: row * (size + GAP) + size / 2,
    }
  })

  return (
    <svg className='absolute top-0 left-0 pointer-events-none' width='100%' height='100%'>
      <g opacity={0.5}>
        {points.slice(1).map((p, idx) => {
          const prev = points[idx]
          return (
            <line
              key={idx}
              x1={prev.x}
              y1={prev.y}
              x2={p.x}
              y2={p.y}
              stroke='#e6b22d'
              strokeWidth={20}
              strokeLinecap='round'
            />
          )
        })}
        <circle cx={points[0].x} cy={points[0].y} r={20} fill='#e6b22d' />
      </g>
    </svg>
  )
}
