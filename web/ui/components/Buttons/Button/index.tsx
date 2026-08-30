import { buttonCva } from '@common/cva/button'
import type { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import type { CSSProperties } from 'react'

export interface IProps {
  onClick?: () => void
  class?: string
  children: React.ReactNode
  disabled?: boolean
  style?: CSSProperties
  type?: 'button' | 'submit'
}

export interface ButtonProps extends IProps, VariantProps<typeof buttonCva> {}

export const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, type, ...props }) => (
  <button
    type={type}
    disabled={disabled}
    onClick={(e) => {
      if (type === 'submit') return
      e.preventDefault()
      onClick?.()
    }}
    className={buttonCva({
      ...props,
      class: clsx(props.class, disabled && 'opacity-50 cursor-not-allowed!'),
    })}
    style={props.style}>
    {children}
  </button>
)
