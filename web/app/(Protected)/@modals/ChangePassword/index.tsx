'use client'

import { changePassword } from '@api/password/server'
import ChangePasswordModal from '@pages/Modals/ChangePasswordModal'
import { uiSelector } from '@store/ui/selector'
import { toast } from 'sonner'

const ChangePasswordModalRoot = () => {
  const isOpen = uiSelector.use.isChangePasswordModalOpen()
  const setIsChangePasswordModalOpen = uiSelector.use.setIsChangePasswordModalOpen()

  return (
    <ChangePasswordModal
      isOpen={isOpen}
      onOpenChange={setIsChangePasswordModalOpen}
      handleSubmitNewPassword={async (oldPassword, newPassword) => {
        try {
          const response = await changePassword(oldPassword, newPassword)
          if (!response.status) {
            throw new Error(response.message || 'Failed to change password')
          }
          toast.success('Password changed successfully', {
            classNames: {
              toast: 'border-border! bg-card! text-foreground!',
            },
          })
          setIsChangePasswordModalOpen(false)
          return response
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Something went wrong'
          toast.error(message, {
            classNames: {
              toast: 'border-border! bg-card! text-foreground!',
            },
          })
          throw error
        }
      }}
    />
  )
}

export default ChangePasswordModalRoot
