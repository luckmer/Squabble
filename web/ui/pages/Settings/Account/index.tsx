'use client'
import { Button } from '@components/Buttons/Button'
import Input from '@components/Input'
import { Typography } from '@components/Typography'
import { FC, useState } from 'react'

export interface IProps {
  onClickDeleteAccount: () => Promise<boolean>
}

const Account: FC<IProps> = ({ onClickDeleteAccount }) => {
  const [deletingAccount, setDeletingAccount] = useState(false)

  return (
    <section className='mt-24 flex flex-col gap-12 '>
      <div className='justify-center flex flex-col gap-24 rounded-2xl border border-border bg-card p-20 shadow-soft transition-colors hover:border-input'>
        <Typography text='body' medium>
          Account
        </Typography>
        <div className='flex w-full flex-row gap-12 max-[900px]:flex-col'>
          <div className='flex flex-row items-end justify-center gap-12 w-full'>
            <Input
              label='Username'
              placeholder='username'
              onChange={(e) => {}}
              value={''}
              error={undefined}
            />
            <div className='flex'>
              <Button variant='dark'>
                <Typography text='small'>Save</Typography>
              </Button>
            </div>
          </div>
          <Input
            disabled
            label='Email'
            placeholder='email'
            onChange={() => {}}
            value={'dsds'}
            error={undefined}
          />
        </div>
        <div className='flex flex-row gap-12 w-full max-[900px]:flex-col'>
          <Button variant='dark'>
            <Typography>Change password</Typography>
          </Button>
          <Button
            disabled={deletingAccount}
            variant='red'
            onClick={() => {
              setDeletingAccount(true)
              onClickDeleteAccount().finally(() => {
                setDeletingAccount(false)
              })
            }}>
            <Typography>Delete account</Typography>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Account
