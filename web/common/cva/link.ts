import { cva } from 'class-variance-authority'

export const link = cva('', {
  variants: {
    variant: {
      default:
        'bg-foreground rounded-xl px-12 py-9 hover:bg-primary/90 duration-200 transition-colors ease-in-out',
      transparent:
        'rounded-xl px-12 py-9 hover:bg-accent duration-200 transition-colors ease-in-out',
      dark: 'rounded-xl border border-border bg-card px-12 py-9 text-sm transition-colors hover:bg-elevated',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
