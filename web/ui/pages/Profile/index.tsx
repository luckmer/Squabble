import Card from '@components/Card'
import { Skeleton } from '@components/Skeleton'
import { Typography } from '@components/Typography'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { FC } from 'react'

export interface IProps {
  user: IPublicUser | null
}

const Profile: FC<IProps> = ({ user }) => {
  return (
    <main className='flex flex-col h-full '>
      <section className='mx-auto max-w-6xl w-full py-40 px-24 h-full flex flex-col'>
        <section>
          {!user?.username ? (
            <Skeleton className='h-30 w-100 rounded-md' />
          ) : (
            <div className='flex flex-col w-fit gap-8'>
              <Typography text='h1' medium>
                {user?.username}
              </Typography>
              <div>
                <Typography text='caption' color='mutedForeground'>
                  {user?.email}
                </Typography>
              </div>
            </div>
          )}
        </section>
        <section className='py-24 grid grid-cols-3 gap-12'>
          <Card stats='0' title='played' />
          <Card stats='0 %' title='win rate' />
          <Card stats='0' title='steak' />
        </section>
        <section className='py-24 flex flex-col gap-12 h-full'>
          <div className='flex flex-row items-center justify-between w-full'>
            <Typography text='body' medium>
              Guess distribution
            </Typography>
          </div>
          <div className='items-center justify-center flex flex-col gap-24 rounded-2xl border border-border bg-card p-16 shadow-soft transition-colors hover:border-input h-full'></div>
        </section>
        <section className='py-24 flex flex-col gap-12 h-full'>
          <div className='flex flex-row items-center justify-between w-full'>
            <Typography text='body' medium>
              Recent games
            </Typography>
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

export default Profile
