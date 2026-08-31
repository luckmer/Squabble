'use client'
import { Typography } from '@components/Typography'
import Account from './Account'
import Notifications from './Notifications'

const Settings = () => {
  return (
    <main className='flex flex-col h-full '>
      <section className=' mx-auto max-w-6xl w-full py-40 px-24 h-full flex flex-col'>
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
        <Account />
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
    </main>
  )
}

export default Settings
