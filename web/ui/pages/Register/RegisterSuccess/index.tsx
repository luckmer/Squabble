import { LinkButton } from '@components/Buttons/Link'
import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'
import { FC } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'

const RegisterSuccess: FC = () => {
  return (
    <div className='bg-card p-32 gap-24 flex flex-col items-center text-center border max-w-sm w-full shadow-lift border-border rounded-2xl'>
      <div className='flex flex-row gap-4'>
        <Tile tile='correct'>
          <AiOutlineCheck size={16} />
        </Tile>
      </div>
      <div className='flex flex-col gap-12'>
        <Typography text='h1' medium>
          Account created
        </Typography>
        <Typography color='mutedForeground'>
          Your account is ready. Sign in to start playing.
        </Typography>
      </div>
      <LinkButton variant='default' href='/login' class='w-full'>
        <Typography color='background'>Go to sign in</Typography>
      </LinkButton>
    </div>
  )
}

export default RegisterSuccess
