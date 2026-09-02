import { link } from '@common/cva/link'
import type { VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import type { CSSProperties } from 'react'

export interface IProps {
  onClick?: () => void
  class?: string
  children: React.ReactNode
  style?: CSSProperties
  preventDefault?: boolean
  href: string
}

export interface LinkProps extends IProps, VariantProps<typeof link> {}

export const LinkButton: React.FC<LinkProps> = ({
  children,
  href,
  preventDefault,
  onClick,
  ...props
}) => (
  <Link
    onClick={(e) => {
      if (preventDefault) e.preventDefault()
      onClick?.()
    }}
    href={href}
    className={link({
      ...props,
      class: props.class,
    })}
    style={props.style}>
    {children}
  </Link>
)
