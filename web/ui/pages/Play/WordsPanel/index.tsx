'use client'

import EmptyState from '@components/EmptyState'
import { Typography } from '@components/Typography'
import { FC, useMemo } from 'react'

export interface IProps {
  answers: string[]
  wordsFound: string[]
}

const WordsPanel: FC<IProps> = ({ answers, wordsFound }) => {
  const wordsByLength = useMemo(() => {
    return wordsFound.reduce<Record<number, string[]>>((acc, word) => {
      const length = word.length

      return {
        ...acc,
        [length]: [...(acc[length] ?? []), word],
      }
    }, {})
  }, [wordsFound])

  const answersByLength = useMemo(() => {
    return answers.reduce<Record<number, string[]>>((acc, word) => {
      const length = word.length

      return {
        ...acc,
        [length]: [...(acc[length] ?? []), word],
      }
    }, {})
  }, [answers])

  return (
    <aside className='rounded-2xl border border-border bg-card p-16 shadow-soft h-full flex flex-col min-h-0 overflow-hidden'>
      <Typography medium>Words found</Typography>
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
      {!wordsFound.length ? (
        <section className='mt-24'>
          <EmptyState />
        </section>
      ) : (
        <section className='mt-24 flex flex-col gap-24 overflow-y-auto min-h-0 flex-1'>
          {Object.entries(wordsByLength).map(([length, words]) => (
            <div key={length} className='flex flex-col gap-12'>
              <Typography text='small' medium color='mutedForeground'>
                {length} letter words
              </Typography>
              <div className='flex gap-8 flex-wrap'>
                {words.map((word, i) => (
                  <div className='bg-tile-correct/15 px-12 py-4 rounded-2xl' key={`${word}-${i}`}>
                    <Typography text='small' key={word} color='tileCorrect'>
                      {word}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </aside>
  )
}

export default WordsPanel
