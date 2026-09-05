'use client'
import { Typography } from '@components/Typography'
import { FC } from 'react'
import Account from './Account'
import Notifications from './Notifications'

export interface IProps {
  onClickDeleteAccount: () => Promise<boolean>
}

const Settings: FC<IProps> = ({ onClickDeleteAccount }) => {
  return (
    <main className='flex flex-col h-full overflow-hidden'>
      <div className='overflow-y-auto min-h-0 w-full '>
        <section className='mx-auto flex max-w-6xl flex-1 flex-col px-24 pt-40 '>
          <section>
            <div className='flex flex-col w-fit gap-8'>
              <Typography text='h1' medium>
                Settings
              </Typography>
              <div>
                <Typography text='caption' color='mutedForeground'>
                  Preferences are stored on this device for now.
                </Typography>
              </div>
            </div>
          </section>
          <Account onClickDeleteAccount={onClickDeleteAccount} />
          <section className='mt-32 flex flex-col gap-12 '>
            <div className='justify-center flex flex-col gap-24 rounded-2xl border border-border bg-card p-20 shadow-soft transition-colors hover:border-input'>
              <Typography text='body' medium>
                Appearance
              </Typography>
              <Typography color='mutedForeground'>
                Wordly currently ships with a single, dark theme tuned for long sessions.
              </Typography>
            </div>
          </section>
          <Notifications />
        </section>
      </div>
    </main>
  )
}

export default Settings
