'use client'
import { Skeleton } from '@components/Skeleton'
import { Typography } from '@components/Typography'
import { FC } from 'react'

export interface IProps {
  title: string
  stats?: string
  isLoading?: boolean
}

const Card: FC<IProps> = ({ title, stats, isLoading }) => {
  return (
    <div className='flex flex-col gap-24 rounded-2xl border border-border bg-card p-16 shadow-soft transition-colors hover:border-input'>
      <Typography uppercase medium text='small' color='mutedForeground'>
        {title}
      </Typography>

      {!stats || isLoading ? (
        <Skeleton className='h-30 w-full rounded-md' />
      ) : (
        <Typography text='h1' medium>
          {stats}
        </Typography>
      )}
    </div>
  )
}

export default Card
