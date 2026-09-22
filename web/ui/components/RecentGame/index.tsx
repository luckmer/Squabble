'use client'
import { Typography } from '@components/Typography'
import { GAME_MODE } from '@interfaces/api/recentGames/enums'
import { IRecentGame } from '@interfaces/api/recentGames/interfaces'
import { formatGameTime } from '@utils/index'
import { FC, useMemo } from 'react'
import { GoPeople, GoPerson } from 'react-icons/go'

export interface IProps extends IRecentGame {
  username: string
}

const RecentGame: FC<IProps> = ({
  game_mode,
  words_total,
  words_solved,
  played_at,
  duration_seconds,
}) => {
  const isClearedBoard = useMemo(() => words_total === words_solved, [words_solved, words_total])

  const percentage = useMemo(() => {
    return words_total === 0 ? 0 : Math.min(100, (words_solved / words_total) * 100)
  }, [words_solved, words_total])

  return (
    <div className='flex items-center justify-between border-b border-border px-16 py-14 transition-colors duration-150 hover:bg-elevated/60'>
      <div className='flex min-w-0 items-center gap-24'>
        <div className='flex shrink-0 rounded-full bg-tile-correct/20 p-10'>
          {game_mode === GAME_MODE.SINGLE_PLAYER ? (
            <GoPerson color='#24a965' />
          ) : (
            <GoPeople color='#24a965' />
          )}
        </div>
        <div className='flex min-w-0 flex-col gap-4'>
          <div className='flex min-w-0 items-center gap-4'>
            <Typography medium>
              {isClearedBoard ? 'Cleared the board' : `${words_solved} of ${words_total}`}
            </Typography>
            <Typography color='mutedForeground'>Single player</Typography>
          </div>
          <Typography color='mutedForeground' text='small'>
            {formatGameTime(duration_seconds, played_at)}
          </Typography>
        </div>
      </div>
      <Typography text='small' color='mutedForeground'>
        {percentage.toFixed(2)}%
      </Typography>
    </div>
  )
}

export default RecentGame
