'use client'
import { LinkButton } from '@components/Buttons/Link'
import Footer from '@components/Footer'
import { Path } from '@components/Path'
import { Typography } from '@components/Typography'

const Home = () => {
  const coordinates: number[][] = [
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 0],
  ]

  const tiles = [
    ['u', 'p', 'i', 'a'],
    ['t', 'r', 'a', 'e'],
    ['s', 'f', 'k', 'g'],
    ['u', 'e', 'u', 'n'],
  ]

  return (
    <main className='flex flex-col h-screen'>
      <section className='bg-[linear-gradient(to_right,oklch(1_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.035)_1px,transparent_1px)] bg-size-[56px_56px]   w-full'>
        <section className='mx-auto max-w-6xl w-full'>
          <div className='py-96 px-24 grid grid-cols-2 gap-24 max-[900px]:grid-cols-1 max-[900px]:gap-64'>
            <div>
              <Typography
                text='custom'
                class='text-[60px] max-[700px]:text-[40px] max-[700px]:leading-48 font-400 leading-72 tracking-[0.48px]'
                medium>
                Find every word. Beat your friends.
              </Typography>
              <div className='mt-20'>
                <Typography text='body' class='leading-24!' color='mutedForeground' medium>
                  Squarely hides dozens of words in a 4×4 grid. Link adjacent letters — including
                  diagonals — to clear the board. Play alone, or share a room code and race.
                </Typography>
              </div>
              <div className='flex gap-12 mt-32 max-[700px]:flex-col'>
                <LinkButton
                  variant='default'
                  href='/login'
                  class='px-32 py-12 flex items-center max-[700px]:justify-center'>
                  <Typography color='black' medium>
                    Play now
                  </Typography>
                </LinkButton>
                <LinkButton
                  variant='dark'
                  href='/login'
                  class='px-32 py-12 flex items-center max-[700px]:justify-center'>
                  <Typography color='primary' medium>
                    Play with friends
                  </Typography>
                </LinkButton>
              </div>
            </div>
            <div className='flex justify-center lg:justify-end w-full'>
              <div className='rounded-3xl border border-border bg-card p-32 shadow-lift flex flex-col items-center justify-center'>
                <div className='grid gap-12 relative'>
                  {tiles.map((row, i) => (
                    <div key={i} className='grid grid-cols-4 gap-12'>
                      {row.map((tile, j) => (
                        <div
                          key={j}
                          className='aspect-square w-64 flex items-center justify-center rounded-2xl border border-border'>
                          <Typography text='h1' medium uppercase>
                            {tile}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  ))}
                  <Path coordinates={coordinates} size={64} />
                </div>
                <div className='mt-16'>
                  <Typography color='mutedForeground' class='tracking-[5px]' medium>
                    TRAP
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </main>
  )
}

export default Home
