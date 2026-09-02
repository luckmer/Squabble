import { Typography } from "@components/Typography"
import clsx from "clsx"
import { FC } from "react"

export interface IProps {
  progress: number
  title: string
  amount: string
}

const Progress: FC<IProps> = ({ progress, title, amount }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  return (
    <div className='h-full w-full flex flex-row items-center gap-24'>
      <Typography text='small' color='mutedForeground' nowrap>{title}</Typography>
      <div className='bg-elevated h-24 w-full rounded-2xl relative'>
        <div
          className={clsx('absolute top-0 left-0 h-full flex items-center justify-end pl-15 pr-12 bg-tile-correct/85 rounded-2xl')}
          style={{ width: `${clampedProgress}%` }}
        >
          <Typography text='small' color='black' nowrap>{amount}</Typography>
        </div>
      </div>
    </div>
  )
}

export default Progress