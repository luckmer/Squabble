'use client'
import SwitchTile from '@components/SwitchTile'
import { Typography } from '@components/Typography'

const Notifications = () => {
  return (
    <section className='mt-32 flex flex-col gap-12 pb-40'>
      <div className='justify-center flex flex-col gap-24 rounded-2xl border border-border bg-card p-20 shadow-soft transition-colors hover:border-input'>
        <Typography text='body' medium>
          Notifications
        </Typography>
        <SwitchTile
          onClick={() => {}}
          title='Notifications'
          checked
          description='Receive notifications'
        />
      </div>
    </section>
  )
}

export default Notifications
