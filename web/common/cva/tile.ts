'use client'
import { cva } from 'class-variance-authority'

export const tile = cva(
  'grid size-24 place-items-center rounded-[0.3rem] text-[0.7rem] font-bold',
  {
    variants: {
      tile: {
        correct: 'bg-tile-correct text-tile-correct-foreground',
        present: 'bg-tile-present text-tile-present-foreground',
        absent: 'bg-tile-absent text-tile-absent-foreground',
      },
    },
  },
)
