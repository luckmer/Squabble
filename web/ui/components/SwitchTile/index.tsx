'use client'
import { Switch } from '@components/Buttons/Switch'
import { Typography } from '@components/Typography'
import { FC } from 'react'

export interface IProps {
  title: string
  description: string
  checked: boolean
  onClick: () => void
}

const SwitchTile: FC<IProps> = ({ checked, title, description, onClick }) => {
  return (
    <div className='flex flex-row items-center justify-between border-b border-border py-14'>
      <div className='flex flex-col gap-4'>
        <Typography text='caption'>{title}</Typography>
        <Typography text='small' color='mutedForeground'>
          {description}
        </Typography>
      </div>
      <div>
        <Switch onClick={onClick} checked={checked} />
      </div>
    </div>
  )
}

export default SwitchTile
