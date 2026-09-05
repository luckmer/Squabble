'use client'
import { Button } from '@components/Buttons/Button'
import { Dialog } from '@components/Dialog/Dialog'
import { DialogContent } from '@components/Dialog/DialogContent'
import Input from '@components/Input'
import { Typography } from '@components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { PasswordFormData, passwordSchema } from './schema'

export interface IProps {
  isOpen: boolean
  onOpenChange: (status: boolean) => void
  handleSubmitNewPassword: (
    oldPassword: string,
    newPassword: string,
  ) => Promise<{ status: boolean }>
}

const ChangePasswordModal: FC<IProps> = ({ isOpen, onOpenChange, handleSubmitNewPassword }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  const onSubmit = async (data: PasswordFormData) => {
    setIsSubmitting(true)
    setErrorMessage(null)
    try {
      await handleSubmitNewPassword(data.currentPassword, data.newPassword)
      reset()
      onOpenChange(false)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to change password')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (status: boolean) => {
    setErrorMessage(null)
    onOpenChange(status)
  }

  const clearError = () => {
    setErrorMessage(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className='p-24 flex flex-col gap-24'>
        <section>
          <Typography text='body' medium>
            Change password
          </Typography>
        </section>
        {errorMessage && (
          <section className=' border border-destructive rounded-xl bg-destructive/20 p-12'>
            <Typography text='caption' color='destructive'>
              {errorMessage}
            </Typography>
          </section>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-12'>
          <Controller
            name='currentPassword'
            control={control}
            render={({ field }) => (
              <Input
                label='Current password'
                type='password'
                placeholder=''
                error={errors.currentPassword?.message}
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  clearError()
                }}
              />
            )}
          />
          <Controller
            name='newPassword'
            control={control}
            render={({ field }) => (
              <Input
                label='New password'
                type='password'
                placeholder=''
                error={errors.newPassword?.message}
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  clearError()
                }}
              />
            )}
          />
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <Input
                label='Confirm new password'
                type='password'
                placeholder=''
                error={errors.confirmPassword?.message}
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  clearError()
                }}
              />
            )}
          />
          <section className='flex flex-row gap-12 justify-end items-center'>
            <Button
              variant='dark'
              type='button'
              disabled={isSubmitting}
              onClick={() => handleOpenChange(false)}>
              <Typography>Cancel</Typography>
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              <Typography color='black'>
                {isSubmitting ? 'Updating...' : 'Update password'}
              </Typography>
            </Button>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePasswordModal
