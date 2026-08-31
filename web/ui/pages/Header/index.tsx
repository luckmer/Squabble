'use client'
import { LinkButton } from '@components/Buttons/Link'
import { Popover } from '@components/Popover/Popover'
import { PopoverContent } from '@components/Popover/PopoverContent'
import { PopoverTrigger } from '@components/Popover/PopoverTrigger'
import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { FC } from 'react'
import { PiSignOutBold } from 'react-icons/pi'

export interface IProps {
  onClickLogout: () => void
  user: IPublicUser | null
  pathname: string
  isAuthenticated: boolean
}

const HeaderPage: FC<IProps> = ({ pathname, isAuthenticated, user, onClickLogout }) => {
  if (pathname === '/login' || pathname === '/register') {
    return null
  }

  return (
    <header className='sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl px-24'>
      <div className='mx-auto flex py-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
        <LinkButton variant='none' href='#' class='flex flex-row items-center gap-8'>
          <div className='flex flex-row gap-4'>
            <Tile tile='correct'>S</Tile>
            <Tile tile='present'>G</Tile>
          </div>
          <Typography text='body' medium>
            Sguabble
          </Typography>
        </LinkButton>
        {!isAuthenticated ? (
          <div className='flex flex-row gap-12'>
            <LinkButton variant='transparent' href='/login'>
              <Typography text='small' color='primary'>
                Sign in
              </Typography>
            </LinkButton>
            <LinkButton variant='default' href='/register'>
              <Typography text='small' color='black' medium>
                Create account
              </Typography>
            </LinkButton>
          </div>
        ) : (
          <div className='flex flex-row gap-12'>
            <Popover>
              <PopoverTrigger
                render={
                  <button className='rounded-full border border-border bg-card px-12 py-8 text-sm transition-colors hover:bg-elevated cursor-pointer'>
                    <Typography text='small'>{user?.username ?? 'Unknown User'}</Typography>
                  </button>
                }
              />
              <PopoverContent className='w-[210px] ' align='end'>
                <div className='border-b border-border pb-9 pt-0 flex items-center '>
                  <Typography text='small' color='mutedForeground'>
                    {user?.email ?? 'Unknown User'}
                  </Typography>
                </div>
                <div className='flex flex-col gap-10'>
                  <div className='flex flex-col border-b border-border py-8 gap-4'>
                    <LinkButton variant='transparent' href='#'>
                      <Typography>Profile</Typography>
                    </LinkButton>
                    <LinkButton variant='transparent' href='#'>
                      <Typography>Settings</Typography>
                    </LinkButton>
                  </div>
                  <LinkButton
                    onClick={() => {
                      onClickLogout()
                    }}
                    variant='transparent'
                    href='/'
                    class='flex flex-row items-center gap-8'>
                    <PiSignOutBold />
                    <Typography>Sign out</Typography>
                  </LinkButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </header>
  )
}

export default HeaderPage
