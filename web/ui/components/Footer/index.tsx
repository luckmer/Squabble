import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'

const Footer = () => {
  return (
    <footer className='border-t border-border px-32 py-24 mt-auto'>
      <div className='flex flex-row items-center gap-8 mx-auto max-w-6xl w-full'>
        <div className='flex flex-row gap-4'>
          <Tile tile='correct'>S</Tile>
          <Tile tile='present'>G</Tile>
        </div>
        <Typography text='body' color='mutedForeground' medium>
          Sguabble
        </Typography>
      </div>
    </footer>
  )
}

export default Footer
