'use client'
import { Button } from '@components/Buttons/Button'
import { LinkButton } from '@components/Buttons/Link'
import { Dialog } from '@components/Dialog/Dialog'
import { DialogContent } from '@components/Dialog/DialogContent'
import EmptyState from '@components/EmptyState'
import { Typography } from '@components/Typography'
import { FC, useMemo } from 'react'
import { IoReloadOutline } from 'react-icons/io5'

export interface IProps {
  onClickGoToDashboard: () => void
  onClickGenerateNewBoard: () => void
  isOpen: boolean
  answers: string[]
  wordsFound: string[]
}

const RoundOverModal: FC<IProps> = ({
  isOpen,
  answers,
  wordsFound,
  onClickGoToDashboard,
  onClickGenerateNewBoard,
}) => {
  const answersByLength = useMemo(() => {
    return answers.reduce<Record<number, string[]>>((acc, word) => {
      const length = word.length

      return {
        ...acc,
        [length]: [...(acc[length] ?? []), word],
      }
    }, {})
  }, [answers])

  const wordsByLength = useMemo(() => {
    return wordsFound.reduce<Record<number, string[]>>((acc, word) => {
      const length = word.length

      return {
        ...acc,
        [length]: [...(acc[length] ?? []), word],
      }
    }, {})
  }, [wordsFound])

  return (
    <Dialog open={isOpen}>
      <DialogContent className='p-24'>
        <section>
          <Typography text='h1' medium>
            Round over
          </Typography>
        </section>
        <section className='mt-12'>
          <Typography color='mutedForeground'>
            {wordsFound.length} of {answers.length} words
          </Typography>
        </section>

        <section className='flex flex-row justify-between gap-8 mt-16'>
          {Object.entries(answersByLength).map(([length, words]) => {
            const foundCount = wordsByLength[Number(length)]?.length ?? 0
            return (
              <div
                key={length}
                className='flex flex-col w-full rounded-2xl border border-border overflow-hidden'>
                <div className='flex items-center justify-center py-6 bg-muted/40'>
                  <Typography text='small' medium color='tileCorrect'>
                    {length}
                  </Typography>
                </div>
                <div className='flex items-center justify-center py-8 border-t border-border'>
                  <Typography medium>
                    {foundCount}/{words.length}
                  </Typography>
                </div>
              </div>
            )
          })}
        </section>
        <section className='max-h-[110px] overflow-y-auto'>
          {!wordsFound.length ? (
            <div className='mt-24'>
              <EmptyState />
            </div>
          ) : (
            <div className='mt-24 flex flex-col gap-24'>
              {Object.entries(wordsByLength).map(([length, words]) => (
                <div key={length} className='flex flex-col gap-12'>
                  <Typography text='small' medium color='mutedForeground'>
                    {length} letter words
                  </Typography>
                  <div className='flex gap-8 flex-wrap pb-16'>
                    {words.map((word, i) => (
                      <div
                        className='bg-tile-correct/15 px-12 py-4 rounded-2xl'
                        key={`${word}-${i}`}>
                        <Typography text='small' color='tileCorrect'>
                          {word}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
        <section className='w-full flex flex-row gap-12 mt-16'>
          <Button
            class='w-full flex items-center justify-center gap-12'
            onClick={onClickGenerateNewBoard}>
            <IoReloadOutline color='#000' />
            <Typography color='black'>New board</Typography>
          </Button>
          <LinkButton
            href='/dashboard'
            class='w-full rounded-md!'
            variant='dark'
            onClick={onClickGoToDashboard}>
            <Typography>Back to dashboard</Typography>
          </LinkButton>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default RoundOverModal
