'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'

import { Button } from '@components/Buttons/Button'
import clsx from 'clsx'
import { DialogOverlay } from '../DialogOverlay'
import { DialogPortal } from '../DialogPortal'

export const DialogContent = ({
  className,
  children,
  showCloseButton = false,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot='dialog-content'
        className={clsx(
          'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className,
        )}
        {...props}>
        {children}
        {showCloseButton && <Button>Close</Button>}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}
