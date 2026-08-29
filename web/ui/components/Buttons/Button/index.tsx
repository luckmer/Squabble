import { buttonCva } from '@common/cva/button'
import type { VariantProps } from 'class-variance-authority'
import type { CSSProperties } from 'react'

export interface IProps {
  class?: string
  children: React.ReactNode
  style?: CSSProperties
}

export interface ButtonProps extends IProps, VariantProps<typeof buttonCva> {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    className={buttonCva({
      ...props,
      class: props.class,
    })}
    style={props.style}>
    {children}
  </button>
)
