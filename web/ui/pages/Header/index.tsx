import { LinkButton } from '@components/Buttons/Link'
import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'

const HeaderPage = () => {
  return (
    <header className='sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl px-24'>
      <div className='mx-auto flex py-16 max-w-6xl items-center justify-between px-4 sm:px-6'>
        <LinkButton variant='none' href='#' class='flex flex-row items-center gap-8'>
          <div className='flex flex-row gap-4'>
            <Tile tile='correct'>S</Tile>
            <Tile tile='present'>G</Tile>
          </div>
          <Typography text='body' medium>
            Sguabble
          </Typography>
        </LinkButton>
        <div className='flex flex-row gap-12'>
          <LinkButton variant='transparent' href='/login'>
            <Typography text='small' color='primary'>
              Sign in
            </Typography>
          </LinkButton>
          <LinkButton variant='default' href='/register'>
            <Typography text='small' color='black' medium>
              Create account
            </Typography>
          </LinkButton>
        </div>
      </div>
    </header>
  )
}

export default HeaderPage
