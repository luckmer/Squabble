'use client'
import { LinkButton } from '@components/Buttons/Link'
import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'
import { FC, useState } from 'react'
import RegisterForm from './RegisterForm'
import { RegisterFormValues } from './RegisterForm/schema'
import RegisterSuccess from './RegisterSuccess'

export interface IProps {
  onSubmit: (data: RegisterFormValues) => Promise<{ status: boolean; error?: string }>
}

const Register: FC<IProps> = ({ onSubmit }) => {
  const [success, setSuccess] = useState(false)

  return (
    <main className='flex flex-col h-full overflow-hidden bg-[linear-gradient(to_right,oklch(1_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.035)_1px,transparent_1px)] bg-size-[56px_56px] w-full'>
      <div className='overflow-y-auto min-h-0 h-full w-full pb-10'>
        <section className='w-full max-w-6xl min-h-full mx-auto flex flex-col gap-32 items-center justify-center px-24 py-40 pb-40'>
          <LinkButton variant='none' href='/' class='flex flex-row items-center gap-8'>
            <div className='flex flex-row gap-4'>
              <Tile tile='correct'>S</Tile>
              <Tile tile='present'>G</Tile>
            </div>
            <Typography text='body' medium>
              Sguabble
            </Typography>
          </LinkButton>
          {success ? (
            <RegisterSuccess />
          ) : (
            <RegisterForm onSubmit={onSubmit} onSuccess={() => setSuccess(true)} />
          )}
          {!success && (
            <div className='flex flex-row gap-8'>
              <Typography color='mutedForeground'>Already playing?</Typography>
              <LinkButton
                variant='none'
                href='/login'
                class='flex flex-row items-center gap-8 hover:underline'>
                <Typography>Sign in</Typography>
              </LinkButton>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Register
