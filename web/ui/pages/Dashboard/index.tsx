'use client'
import { Button } from '@components/Buttons/Button'
import Card from '@components/Card'
import RecentGame from '@components/RecentGame'
import { Skeleton } from '@components/Skeleton'
import { Typography } from '@components/Typography'
import { IRecentGame } from '@interfaces/api/recentGames/interfaces'
import { IPublicUser } from '@interfaces/api/user/interfaces'
import { FC, useState } from 'react'

export interface IProps {
  onClickLoadMore: () => Promise<void>
  recentGames: IRecentGame[]
  isLoading: boolean
  isStatsLoading: boolean
  gamesPlayed: number
  solveRate: number
  user: IPublicUser | null
  isCursor: boolean
}

const Dashboard: FC<IProps> = ({
  user,
  recentGames,
  isLoading,
  isStatsLoading,
  gamesPlayed,
  solveRate,
  isCursor,
  onClickLoadMore,
}) => {
  const [loader, setLoader] = useState(false)

  return (
    <main className='flex flex-1 flex-col overflow-hidden min-h-0'>
      <div className='overflow-y-auto min-h-0 w-full flex-1'>
        <section className='mx-auto flex max-w-6xl flex-col px-24 pt-40 pb-40'>
          <section className='shrink-0'>
            <div className='flex w-fit flex-col gap-8'>
              <Typography color='mutedForeground'>Good evening</Typography>
              {!user?.username ? (
                <Skeleton className='h-30 w-full rounded-md' />
              ) : (
                <Typography text='h1' medium>
                  {user.username}
                </Typography>
              )}
            </div>
          </section>
          <section className='grid shrink-0 grid-cols-2 gap-12 py-24'>
            <Card stats={gamesPlayed.toString()} title='played' isLoading={isStatsLoading} />
            <Card
              stats={`${solveRate.toFixed(2)}%`}
              title='solve rate'
              isLoading={isStatsLoading}
            />
          </section>
          <section className='flex flex-col gap-12 pt-24'>
            <div className='flex shrink-0 items-center justify-between'>
              <Typography text='body' medium>
                Recent games
              </Typography>
            </div>
            <div className='min-h-[400px] min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-soft'>
              {isLoading ? (
                <div className='flex flex-col gap-12 overflow-hidden'>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className='flex w-full shrink-0 items-center gap-12  border-b border-border p-12 sm:p-16'>
                      <Skeleton className='size-30 shrink-0 rounded-full' />
                      <div className='flex min-w-0 flex-1 flex-col gap-8'>
                        <Skeleton className='h-12 w-1/2 max-w-160 rounded-md' />
                        <Skeleton className='h-12 w-1/3 max-w-120 rounded-md' />
                      </div>
                      <div className='flex shrink-0 flex-col items-end gap-8'>
                        <Skeleton className='h-12 w-64 rounded-md sm:w-80' />
                        <Skeleton className='h-12 w-40 rounded-md sm:w-48' />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !recentGames.length ? (
                <div className='flex h-[400px] items-center justify-center'>
                  <Typography uppercase medium text='small' color='mutedForeground'>
                    No recent games
                  </Typography>
                </div>
              ) : (
                <div>
                  {recentGames.map((game) => (
                    <RecentGame
                      key={game.id}
                      username={user?.username ?? 'Unknown user'}
                      id={game.id}
                      game_mode={game.game_mode}
                      user_id={game.user_id}
                      opponent_name={game.opponent_name}
                      played_at={game.played_at}
                      duration_seconds={game.duration_seconds}
                      words_solved={game.words_solved}
                      words_total={game.words_total}
                    />
                  ))}
                  {loader &&
                    Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className='flex w-full shrink-0 items-center gap-12  border-b border-border p-12 sm:p-16'>
                        <Skeleton className='size-30 shrink-0 rounded-full' />
                        <div className='flex min-w-0 flex-1 flex-col gap-8'>
                          <Skeleton className='h-12 w-1/2 max-w-160 rounded-md' />
                          <Skeleton className='h-12 w-1/3 max-w-120 rounded-md' />
                        </div>
                        <div className='flex shrink-0 flex-col items-end gap-8'>
                          <Skeleton className='h-12 w-64 rounded-md sm:w-80' />
                          <Skeleton className='h-12 w-40 rounded-md sm:w-48' />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
            {isCursor && (
              <div className='w-full flex items-center justify-center'>
                <Button
                  disabled={loader}
                  variant='dark'
                  onClick={() => {
                    setLoader(true)
                    onClickLoadMore().finally(() => setLoader(false))
                  }}
                  class='w-full'>
                  <Typography>Load more</Typography>
                </Button>
              </div>
            )}
          </section>
        </section>
      </div>
    </main>
  )
}

export default Dashboard
