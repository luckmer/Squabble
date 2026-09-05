'use client'
import { LinkButton } from '@components/Buttons/Link'
import HeaderNavigation from '@components/Header/HeaderNavigation'
import { UserMenu } from '@components/Header/UserMenu'
import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { FC } from 'react'
import { IoMdArrowBack } from 'react-icons/io'

export interface IProps {
  onClickLogout: () => void
  user: IPublicUser | null
  pathname: string
  isAuthenticated: boolean
  wordsFound: number
  answers: number
}

const HeaderPage: FC<IProps> = ({
  pathname,
  isAuthenticated,
  user,
  wordsFound,
  answers,
  onClickLogout,
}) => {
  if (pathname === '/login' || pathname === '/register') {
    return null
  }

  return (
    <header className='sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl px-24'>
      <div className='mx-auto flex py-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
        {pathname === '/play' ? (
          <LinkButton
            variant='none'
            href={isAuthenticated ? '/dashboard' : '/'}
            class='flex flex-row items-center gap-8 group'>
            <IoMdArrowBack className='text-muted-foreground group-hover:text-primary' />
            <Typography color='mutedForeground' class='group-hover:text-primary'>
              Back
            </Typography>
          </LinkButton>
        ) : (
          <LinkButton
            variant='none'
            href={isAuthenticated ? '/dashboard' : '/'}
            class='flex flex-row items-center gap-8'>
            <div className='flex flex-row gap-4'>
              <Tile tile='correct'>S</Tile>
              <Tile tile='present'>G</Tile>
            </div>
            <Typography text='body' medium>
              Sguabble
            </Typography>
          </LinkButton>
        )}
        {pathname === '/play' && (
          <div className='flex w-full flex-col justify-center items-center'>
            <Typography>Solo board</Typography>
            <Typography color='mutedForeground'>
              {wordsFound}/{answers} words
            </Typography>
          </div>
        )}
        {pathname !== '/play' &&
          (!isAuthenticated ? (
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
            <div className='flex w-full flex-row justify-between'>
              <div className='flex flex-row w-full max-[900px]:hidden'>
                <HeaderNavigation pathname={pathname} />
              </div>
              <div className='flex flex-row gap-12 max-[900px]:w-full justify-end'>
                <UserMenu user={user} onClickLogout={onClickLogout} />
              </div>
            </div>
          ))}
      </div>
    </header>
  )
}

export default HeaderPage
