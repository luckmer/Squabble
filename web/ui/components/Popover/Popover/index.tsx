'use client'
import { Popover as PopoverPrimitive } from '@base-ui/react/popover'

export const Popover = ({ ...props }: PopoverPrimitive.Root.Props) => {
  return <PopoverPrimitive.Root data-slot='popover' {...props} />
}
