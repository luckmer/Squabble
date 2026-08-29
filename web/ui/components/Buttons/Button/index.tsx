import { buttonCva } from '@common/cva/button'
import type { VariantProps } from 'class-variance-authority'
import type { CSSProperties } from 'react'

export interface IProps {
  onClick?: () => void
  class?: string
  children: React.ReactNode
  style?: CSSProperties
  type?: 'button' | 'submit'
}

export interface ButtonProps extends IProps, VariantProps<typeof buttonCva> {}

export const Button: React.FC<ButtonProps> = ({ children, onClick, type, ...props }) => (
  <button
    type={type}
    onClick={(e) => {
      if (type === 'submit') return
      e.preventDefault()
      onClick?.()
    }}
    className={buttonCva({
      ...props,
      class: props.class,
    })}
    style={props.style}>
    {children}
  </button>
)
