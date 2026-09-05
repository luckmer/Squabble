import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'

const Footer = () => {
  return (
    <footer className='border-t border-border px-32 py-24 '>
      <div className='flex flex-row items-center gap-8 mx-auto max-w-6xl w-full'>
        <div className='flex flex-row gap-4'>
          <Tile tile='correct'>
            <Typography text='small' color='black'>
              S
            </Typography>
          </Tile>
          <Tile tile='present'>
            <Typography text='small' color='black'>
              S
            </Typography>
          </Tile>
        </div>
        <Typography text='body' color='mutedForeground' medium>
          Sguabble
        </Typography>
      </div>
    </footer>
  )
}

export default Footer
