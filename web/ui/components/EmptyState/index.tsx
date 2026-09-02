import { Typography } from '@components/Typography'

const EmptyState = () => {
  return (
    <div className='rounded-xl border border-dashed border-border px-12 py-24 '>
      <Typography color='mutedForeground'>
        No words yet. Connect adjacent letters to spell a word of four letters or more.
      </Typography>
    </div>
  )
}

export default EmptyState
