'use client'
import { cva } from 'class-variance-authority'

export const buttonCva = cva('cursor-pointer', {
  variants: {
    variant: {
      default:
        'bg-foreground rounded-md px-12 py-9 hover:bg-primary/90 duration-200 transition-colors ease-in-out',
      darkButton:
        'rounded-full border border-border bg-card px-12 py-9  text-sm transition-colors hover:bg-elevated',
      dark: 'rounded-xl border border-border bg-card px-12 py-9 text-sm transition-colors hover:bg-elevated',
      red: 'bg-destructive rounded-xl px-12 py-9 hover:bg-destructive/90 duration-200 transition-colors ease-in-out',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
