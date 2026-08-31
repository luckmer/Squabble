import { LinkButton } from '@components/Buttons/Link'
import Card from '@components/Card'
import { Skeleton } from '@components/Skeleton'
import { Typography } from '@components/Typography'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { FC } from 'react'

export interface IProps {
  user: IPublicUser | null
}

const Dashboard: FC<IProps> = ({ user }) => {
  return (
    <main className='flex flex-col h-full '>
      <section className='mx-auto max-w-6xl w-full py-40 px-24 h-full flex flex-col'>
        <section>
          <div className='flex flex-col w-fit gap-8'>
            <Typography color='mutedForeground'>Good evening</Typography>
            {!user?.username ? (
              <Skeleton className='h-30 w-full rounded-md' />
            ) : (
              <Typography text='h1' medium>
                {user?.username}
              </Typography>
            )}
          </div>
        </section>
        <section className='py-24 grid grid-cols-3 gap-12'>
          <Card stats='0' title='played' />
          <Card stats='0 %' title='win rate' />
          <Card stats='0' title='steak' />
        </section>
        <section className='py-24 flex flex-col gap-12 h-full'>
          <div className='flex flex-row items-center justify-between w-full'>
            <Typography text='body' medium>
              Recent games
            </Typography>
            <div className='flex'>
              <LinkButton
                variant='none'
                href='/profile'
                class='flex flex-row items-center gap-8 group'>
                <Typography text='small' color='mutedForeground' class='group-hover:text-primary!'>
                  View all
                </Typography>
              </LinkButton>
            </div>
          </div>
          <div className='items-center justify-center flex flex-col gap-24 rounded-2xl border border-border bg-card p-16 shadow-soft transition-colors hover:border-input h-full'>
            <Typography uppercase medium text='small' color='mutedForeground'>
              No recent games
            </Typography>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Dashboard
