'use client'
import { Button } from '@components/Buttons/Button'
import Input from '@components/Input'
import { Typography } from '@components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useEffect, useMemo, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import { RegisterFormValues, registerSchema } from './schema'

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormValues) => Promise<{ status: boolean; error?: string }>
  onSuccess: () => void
}

const RegisterForm: FC<RegisterFormProps> = ({ onSubmit, onSuccess }) => {
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
    mode: 'onChange',
  })

  useEffect(() => {
    reset({ username: '', email: '', password: '', confirmPassword: '' })
  }, [reset])

  const password = useWatch({ control, name: 'password' })
  const requirements = useMemo(() => {
    return [
      { label: 'At least 8 characters', met: password.length >= 8 },
      { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
      { label: 'One number', met: /[0-9]/.test(password) },
    ]
  }, [password])

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        setLoader(true)
        setError('')
        const status = await onSubmit(data)
        setLoader(false)
        if (status.status) {
          onSuccess()
          return
        }
        setError(status?.error ?? 'Failed to create account.')
      })}
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
            onChange={(value) => {
              field.onChange(value)
              if (error.trim().length > 0) setError('')
            }}
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
            onChange={(value) => {
              field.onChange(value)
              if (error.trim().length > 0) setError('')
            }}
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
                if (error.trim().length > 0) setError('')
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
              onChange={(value) => {
                field.onChange(value)
                if (error.trim().length > 0) setError('')
              }}
              value={field.value}
              error={errors.confirmPassword?.message}
            />
          )}
        />
      </div>
      {error.trim().length > 0 && (
        <Typography text='small' color='destructive'>
          {error}
        </Typography>
      )}
      <Button variant='default' type='submit' disabled={loader}>
        <Typography color='background'>{loader ? 'Signing up...' : 'Sign up'}</Typography>
      </Button>
    </form>
  )
}

export default RegisterForm
