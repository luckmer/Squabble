'use client'
import clsx from 'clsx'

export const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot='skeleton'
      className={clsx('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}
