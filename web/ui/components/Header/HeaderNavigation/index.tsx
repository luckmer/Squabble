'use client'
import { LinkButton } from '@components/Buttons/Link'
import { Typography } from '@components/Typography'
import { FC } from 'react'

export interface IProps {
  pathname: string
}

const HeaderNavigation: FC<IProps> = ({ pathname }) => {
  return (
    <div className='flex items-center justify-center w-full gap-12'>
      <LinkButton
        variant='transparent'
        href='/play'
        class={pathname === '/play' ? 'bg-accent' : ''}>
        <Typography text='small' color='mutedForeground' medium>
          Play
        </Typography>
      </LinkButton>
      <LinkButton
        variant='transparent'
        href='/multiplayer'
        class={pathname === '/multiplayer' ? 'bg-accent' : ''}>
        <Typography text='small' color='mutedForeground' medium>
          Multiplayer
        </Typography>
      </LinkButton>
      <LinkButton
        variant='transparent'
        href='/leaderboard'
        class={pathname === '/leaderboard' ? 'bg-accent' : ''}>
        <Typography text='small' color='mutedForeground' medium>
          Leaderboard
        </Typography>
      </LinkButton>

      <LinkButton
        variant='transparent'
        href='/settings'
        class={pathname === '/settings' ? 'bg-accent' : ''}>
        <Typography text='small' color='mutedForeground' medium>
          Setttings
        </Typography>
      </LinkButton>
    </div>
  )
}

export default HeaderNavigation
