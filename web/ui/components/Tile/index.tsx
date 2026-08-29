import { tile } from '@common/cva/tile'
import type { VariantProps } from 'class-variance-authority'
import type { CSSProperties } from 'react'

export interface IProps {
  class?: string
  children: React.ReactNode
  style?: CSSProperties
}

export interface TileProps extends IProps, VariantProps<typeof tile> {}

export const Tile: React.FC<TileProps> = ({ children, ...props }) => (
  <div
    className={tile({
      ...props,
      class: props.class,
    })}
    style={props.style}>
    {children}
  </div>
)
