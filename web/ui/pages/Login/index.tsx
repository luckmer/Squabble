'use client'
import { Button } from '@components/Buttons/Button'
import { LinkButton } from '@components/Buttons/Link'
import Input from '@components/Input'
import { Tile } from '@components/Tile'
import { Typography } from '@components/Typography'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LuLoaderCircle } from 'react-icons/lu'

type LoginFormValues = {
  username: string
  password: string
}

export interface IProps {
  onSubmit(data: LoginFormValues): Promise<boolean>
}

const Login: FC<IProps> = ({ onSubmit }) => {
  const [invalidCredentials, setInvalidCredentials] = useState(false)
  const [loader, setLoader] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { username: '', password: '' },
  })

  return (
    <main className='flex flex-col h-full overflow-hidden bg-[linear-gradient(to_right,oklch(1_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/0.035)_1px,transparent_1px)] bg-size-[56px_56px] w-full'>
      <div className='overflow-y-auto min-h-0 h-full w-full pb-10 '>
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
          <form
            onSubmit={handleSubmit(async (data) => {
              setLoader(true)
              setInvalidCredentials(false)
              const status = await onSubmit(data)
              setLoader(false)
              if (status) {
                return
              }
              setInvalidCredentials(true)
            })}
            className='bg-card p-32 gap-24 flex flex-col border max-w-sm w-full shadow-lift border-border rounded-2xl'>
            <div className='flex flex-col gap-12'>
              <Typography text='h1' medium>
                Sign in
              </Typography>
              <Typography color='mutedForeground'>
                Pick up your streak where you left off.
              </Typography>
            </div>
            <Controller
              name='username'
              control={control}
              rules={{
                required: 'username is required',
              }}
              render={({ field }) => (
                <Input
                  label='Username'
                  placeholder='username'
                  onChange={(e) => {
                    field.onChange(e)
                    if (invalidCredentials) setInvalidCredentials(false)
                  }}
                  value={field.value}
                  error={errors.username?.message}
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
                  onChange={(e) => {
                    field.onChange(e)
                    if (invalidCredentials) setInvalidCredentials(false)
                  }}
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
            {invalidCredentials && (
              <Typography text='small' color='destructive'>
                Invalid username or password.
              </Typography>
            )}
            <Button
              variant='default'
              type='submit'
              class='flex items-center justify-center'
              disabled={loader}>
              {loader ? (
                <LuLoaderCircle color='black' className='animate-spin' />
              ) : (
                <Typography color='background'>Sign in</Typography>
              )}
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
      </div>
    </main>
  )
}

export default Login
