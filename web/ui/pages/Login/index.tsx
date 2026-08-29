'use client'
import { Button } from '@components/Buttons/Button'
import { LinkButton } from '@components/Buttons/Link'
import Input from '@components/Input'
import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

type LoginFormValues = {
  email: string
  password: string
}

export interface IProps {
  onSubmit(data: LoginFormValues): void
}

const Login: FC<IProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
  })

  return (
    <main className='flex items-center justify-center bg-[linear-gradient(to_right,oklch(1_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.035)_1px,transparent_1px)] bg-size-[56px_56px] w-full min-h-screen'>
      <section className='w-full max-w-6xl mx-auto flex flex-col gap-32 items-center'>
        <LinkButton variant='none' href='/' class='flex flex-row items-center gap-8'>
          <div className='flex flex-row gap-4'>
            <Tile tile='correct'>S</Tile>
            <Tile tile='present'>G</Tile>
          </div>
          <Typography text='body' medium>
            Sguabble
          </Typography>
        </LinkButton>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-card p-32 gap-24 flex flex-col border max-w-sm w-full shadow-lift border-border rounded-2xl'>
          <div className='flex flex-col gap-12'>
            <Typography text='h1' medium>
              Sign in
            </Typography>
            <Typography color='mutedForeground'>Pick up your streak where you left off.</Typography>
          </div>
          <Controller
            name='email'
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            }}
            render={({ field }) => (
              <Input
                label='Email'
                placeholder='you@gmail.com'
                onChange={field.onChange}
                value={field.value}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: 'Password is required' }}
            render={({ field }) => (
              <Input
                label='Password'
                type='password'
                placeholder='••••••••'
                onChange={field.onChange}
                value={field.value}
                error={errors.password?.message}
                externalChildren={
                  <LinkButton
                    variant='none'
                    href='/reset'
                    class='flex flex-row items-center gap-8 group'>
                    <Typography
                      text='small'
                      color='mutedForeground'
                      class='group-hover:text-primary!'>
                      Forgot password?
                    </Typography>
                  </LinkButton>
                }
              />
            )}
          />
          <Button variant='default' type='submit'>
            <Typography color='background'>Sign in</Typography>
          </Button>
        </form>
        <div className='flex flex-row gap-8'>
          <Typography color='mutedForeground'>No account?</Typography>
          <LinkButton
            variant='none'
            href='/register'
            class='flex flex-row items-center gap-8 hover:underline'>
            <Typography>Create one</Typography>
          </LinkButton>
        </div>
      </section>
    </main>
  )
}

export default Login
