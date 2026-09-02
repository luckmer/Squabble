'use client'

import { Button } from '@components/Buttons/Button'
import { Path } from '@components/Path'
import { Typography } from '@components/Typography'
import { DIRS } from '@static/index'
import clsx from 'clsx'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CgBackspace } from 'react-icons/cg'
import { IoCheckmark } from 'react-icons/io5'
import { MdOutlineLightbulb } from 'react-icons/md'
import WordsPanel from './WordsPanel'

type WordStatus = 'correct' | 'incorrect' | 'duplicate' | null
export interface IProps {
  onClickFinishBoard: () => void
  onClickGenerateNewBoard: () => void
  board: string[][]
  answers: string[]
}

const Play: FC<IProps> = ({ board, answers, onClickFinishBoard, onClickGenerateNewBoard }) => {
  const [status, setStatus] = useState<WordStatus>(null)
  const [hint, setHint] = useState('')
  const [coordinates, setCoordinates] = useState<number[][]>([])
  const [wordsFound, setWordsFound] = useState<string[]>([])
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [prevBoard, setPrevBoard] = useState(board)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const clearBoardTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const clearingInnerTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  if (JSON.stringify(board) !== JSON.stringify(prevBoard)) {
    setPrevBoard(board)
    setCoordinates([])
    setWordsFound([])
    setStatus(null)
    setIsMouseDown(false)
    setIsClearing(false)
  }

  const clearPendingTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (clearBoardTimeoutRef.current) {
      clearTimeout(clearBoardTimeoutRef.current)
      clearBoardTimeoutRef.current = null
    }
    if (clearingInnerTimeoutRef.current) {
      clearTimeout(clearingInnerTimeoutRef.current)
      clearingInnerTimeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    clearPendingTimeouts()
  }, [board, clearPendingTimeouts])

  const addCoordinate = useCallback((i: number, j: number) => {
    setCoordinates((prev) => {
      const coordinate = [j, i]
      const last = prev.at(-1)

      if (!last) {
        return [coordinate]
      }

      const isNeighbor = DIRS.some(([di, dj]) => last[1] + di === i && last[0] + dj === j)

      if (!isNeighbor) {
        return prev
      }

      const previous = prev.at(-2)

      if (previous?.[0] === j && previous?.[1] === i) {
        return prev.slice(0, -1)
      }

      const alreadySelected = prev.some(([x, y]) => x === j && y === i)

      if (alreadySelected) {
        return prev
      }
      return [...prev, coordinate]
    })
  }, [])

  const word = useMemo(() => {
    return coordinates.map(([x, y]) => board[y][x]).join('')
  }, [coordinates, board])

  const handleMouseDown = (i: number, j: number) => {
    clearPendingTimeouts()
    setIsClearing(false)
    setStatus(null)
    setIsMouseDown(true)
    setCoordinates([[j, i]])
  }

  const handleClear = useCallback(() => {
    clearPendingTimeouts()
    setIsMouseDown(false)
    setIsClearing(false)
    setStatus(null)
    setCoordinates([])
    onClickGenerateNewBoard()
  }, [clearPendingTimeouts, onClickGenerateNewBoard])

  const handleMouseEnter = (i: number, j: number) => {
    if (!isMouseDown) return
    addCoordinate(i, j)
  }

  const handleMouseUp = () => {
    if (!isMouseDown) return

    clearPendingTimeouts()
    setIsMouseDown(false)

    if (!word.trim().length) return

    const isValid = answers.includes(word)
    const isDuplicate = isValid && wordsFound.includes(word)

    if (isValid && !isDuplicate) {
      setWordsFound((prev) => [...prev, word])
      setStatus('correct')
    } else if (isDuplicate) {
      setStatus('duplicate')
    } else {
      setStatus('incorrect')
    }

    timeoutRef.current = setTimeout(() => {
      setStatus(null)
    }, 900)

    clearBoardTimeoutRef.current = setTimeout(() => {
      setIsClearing(true)
      clearingInnerTimeoutRef.current = setTimeout(() => {
        setCoordinates([])
        setIsClearing(false)
      }, 200)
    }, 700)
  }

  useEffect(() => {
    return () => {
      clearPendingTimeouts()
    }
  }, [clearPendingTimeouts])

  const gameboard = useMemo(() => {
    if (!board.length) {
      return [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ]
    }

    return board
  }, [board])

  const isDisabled = useMemo(() => {
    return gameboard
      .flatMap((row) => row)
      .some((cell) => {
        return cell === ''
      })
  }, [gameboard])

  return (
    <main
      className='flex flex-col h-full overflow-y-auto'
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}>
      <section className='mx-auto max-w-6xl w-full py-40 px-24 h-full flex flex-col'>
        <div className='grid grid-cols-[minmax(0,1fr)_20rem] gap-12 h-full'>
          <section className='flex flex-col items-center gap-24 w-full'>
            <div className='h-fit'>
              <Typography
                text='h1'
                uppercase
                class={clsx(
                  'tracking-[6px] transition-all duration-200 ease-out',
                  status === 'correct' && 'text-green-500! scale-105',
                  status === 'incorrect' && 'text-red-500! animate-shake',
                  status === 'duplicate' && 'text-yellow-500!',
                )}>
                {!word.trim().length ? '····' : word}
              </Typography>
            </div>
            <div className='flex flex-col gap-24 items-center'>
              <div className='grid gap-12 relative'>
                {gameboard.map((row, i) => (
                  <div key={i} className='grid grid-cols-4 gap-12'>
                    {row.map((tile, j) => {
                      const selected = coordinates.some(([x, y]) => x === j && y === i)
                      return (
                        <button
                          type='button'
                          disabled={isDisabled}
                          key={j}
                          onMouseDown={() => handleMouseDown(i, j)}
                          onMouseEnter={() => handleMouseEnter(i, j)}
                          className={clsx(
                            isDisabled ? 'opacity-[0.5]' : 'cursor-pointer',
                            'aspect-square w-87 flex items-center justify-center rounded-2xl border border-border bg-card ',
                            'transition-all duration-200 ease-out will-change-transform',
                            selected && !isClearing && 'bg-card/50 shadow-soft scale-95',
                            selected &&
                              status === 'correct' &&
                              'border-green-500/70 bg-green-500/10',
                            selected && status === 'incorrect' && 'border-red-500/70 bg-red-500/10',
                            selected &&
                              status === 'duplicate' &&
                              'border-yellow-500/70 bg-yellow-500/10',
                            isClearing && 'scale-100',
                          )}>
                          <Typography
                            text='h1'
                            medium
                            uppercase
                            class={clsx(
                              'transition-transform duration-150 ease-out',
                              selected && 'scale-110',
                            )}>
                            {tile}
                          </Typography>
                        </button>
                      )
                    })}
                  </div>
                ))}
                <Path coordinates={coordinates} size={87} />
              </div>
              <div>
                <Typography
                  text='small'
                  color='mutedForeground'
                  class='transition-opacity duration-200'>
                  {status === 'incorrect' && 'Not in this board'}
                  {status === 'duplicate' && 'Already found'}
                  {status === 'correct' && 'Correct'}
                  {status === null && 'Drag or tap adjacent letters, then submit.'}
                </Typography>
              </div>
              <div className='flex flex-row gap-12 w-full'>
                <Button
                  disabled={isDisabled}
                  variant='dark'
                  onClick={handleClear}
                  class='flex flex-row gap-8 w-full items-center justify-center'>
                  <CgBackspace />
                  <Typography color='primary'>Clear</Typography>
                </Button>
                <Button
                  disabled={isDisabled}
                  class='w-full flex flex-row gap-12 items-center justify-center'>
                  <IoCheckmark color='#000' />
                  <Typography color='black'>Submit</Typography>
                </Button>
                <Button
                  disabled={isDisabled}
                  variant='dark'
                  onClick={() => {
                    const hint = answers[Math.floor(Math.random() * answers.length)]
                    setHint(hint)
                  }}>
                  <MdOutlineLightbulb />
                </Button>
              </div>
              {hint.trim().length > 0 && (
                <div className='flex flex-row items-center gap-4'>
                  <Typography text='small' color='mutedForeground'>
                    Hint:
                  </Typography>
                  <Typography color='tilePresent' uppercase class='tracking-[2px]'>
                    {`${hint.slice(0, 2)}${'·'.repeat(hint.length - 2)}`}
                  </Typography>
                </div>
              )}
              <div>
                <Button
                  disabled={isDisabled}
                  onClick={onClickFinishBoard}
                  variant='none'
                  class='flex flex-row items-center gap-8 hover:underline group'>
                  <Typography
                    color='mutedForeground'
                    text='small'
                    class='group-hover:text-white! transition-colors duration-200'>
                    Finish board
                  </Typography>
                </Button>
              </div>
            </div>
          </section>
          <WordsPanel answers={answers} wordsFound={wordsFound} />
        </div>
      </section>
    </main>
  )
}

export default Play
