'use client'
import { Button } from '@components/Buttons/Button'
import { LinkButton } from '@components/Buttons/Link'
import Input from '@components/Input'
import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useMemo } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { RegisterFormValues, registerSchema } from './schema'

export interface IProps {
  onSubmit: (data: RegisterFormValues) => void
}

const Register: FC<IProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
    mode: 'onChange',
  })

  const password = useWatch({ control, name: 'password' })
  const requirements = useMemo(() => {
    return [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
      { label: 'One number', met: /[0-9]/.test(password) },
    ]
  }, [password])

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
              Create account
            </Typography>
            <Typography color='mutedForeground'>Free, and takes about twenty seconds.</Typography>
          </div>
          <Controller
            name='username'
            control={control}
            render={({ field }) => (
              <Input
                label='Username'
                placeholder='wordsmith'
                onChange={field.onChange}
                value={field.value}
                error={errors.username?.message}
              />
            )}
          />
          <Controller
            name='email'
            control={control}
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
          <div className='flex w-full flex-col gap-12'>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <Input
                  label='Password'
                  type='password'
                  placeholder='••••••••'
                  onChange={(value) => {
                    field.onChange(value)
                    trigger('confirmPassword')
                  }}
                  value={field.value}
                  error={errors.password?.message}
                />
              )}
            />
            <div className='flex flex-col gap-4'>
              {requirements.map((req) => (
                <div key={req.label} className='flex gap-4 items-center'>
                  {req.met ? (
                    <AiOutlineCheck size={10} className='text-tile-correct' />
                  ) : (
                    <AiOutlineClose size={10} color='#9598a0' />
                  )}
                  <Typography text='small' color={req.met ? undefined : 'mutedForeground'}>
                    {req.label}
                  </Typography>
                </div>
              ))}
            </div>
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <Input
                  label='Confirm password'
                  type='password'
                  placeholder='••••••••'
                  onChange={field.onChange}
                  value={field.value}
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </div>
          <Button variant='default' type='submit'>
            <Typography color='background'>Sign up</Typography>
          </Button>
        </form>
        <div className='flex flex-row gap-8'>
          <Typography color='mutedForeground'>Already playing?</Typography>
          <LinkButton
            variant='none'
            href='/login'
            class='flex flex-row items-center gap-8 hover:underline'>
            <Typography>Sign in</Typography>
          </LinkButton>
        </div>
      </section>
    </main>
  )
}

export default Register
