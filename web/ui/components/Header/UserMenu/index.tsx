'use client'

import { LinkButton } from '@components/Buttons/Link'
import { Popover } from '@components/Popover/Popover'
import { PopoverContent } from '@components/Popover/PopoverContent'
import { PopoverTrigger } from '@components/Popover/PopoverTrigger'
import { Typography } from '@components/Typography'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { FC, useState } from 'react'
import { BiGroup } from 'react-icons/bi'
import { CiSettings } from 'react-icons/ci'
import { LiaGamepadSolid } from 'react-icons/lia'
import { PiSignOutBold } from 'react-icons/pi'
import { TbLayoutDashboard } from 'react-icons/tb'
import { TfiCup } from 'react-icons/tfi'

interface IProps {
  user: IPublicUser | null
  onClickLogout: () => void
}

export const UserMenu: FC<IProps> = ({ user, onClickLogout }) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev)
      }}>
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
          <div className='flex flex-col border-b border-border py-8 gap-4 min-[901px]:hidden'>
            <LinkButton
              variant='transparent'
              href='/play'
              onClick={() => {
                setOpen(false)
              }}
              class='flex flex-row items-center gap-8'>
              <LiaGamepadSolid />
              <Typography>Play</Typography>
            </LinkButton>
            <LinkButton
              variant='transparent'
              href='/multiplayer'
              onClick={() => {
                setOpen(false)
              }}
              class='flex flex-row items-center gap-8'>
              <BiGroup />

              <Typography>Multiplayer</Typography>
            </LinkButton>
            <LinkButton
              variant='transparent'
              href='/leaderboard'
              onClick={() => {
                setOpen(false)
              }}
              class='flex flex-row items-center gap-8'>
              <TfiCup />
              <Typography>Leaderboard</Typography>
            </LinkButton>
          </div>
          <div className='flex flex-col border-b border-border py-8 gap-4'>
            <LinkButton
              variant='transparent'
              href='/dashboard'
              onClick={() => {
                setOpen(false)
              }}
              class='flex flex-row items-center gap-8'>
              <TbLayoutDashboard />
              <Typography>Dashboard</Typography>
            </LinkButton>
            <LinkButton
              variant='transparent'
              href='/settings'
              onClick={() => {
                setOpen(false)
              }}
              class='flex flex-row items-center gap-8'>
              <CiSettings />
              <Typography>Settings</Typography>
            </LinkButton>
          </div>
          <LinkButton
            preventDefault
            onClick={onClickLogout}
            variant='transparent'
            href='/'
            class='flex flex-row items-center gap-8'>
            <PiSignOutBold />
            <Typography>Sign out</Typography>
          </LinkButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}
