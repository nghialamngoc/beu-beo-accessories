'use client'

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { useFloatingContext } from './Floating'

export interface FloatingItemProps<T extends ElementType> {
  as?: T
  closeOnClick?: boolean
  children?: ReactNode
}

export const FloatingItem = <T extends ElementType = 'div'>(
  props: FloatingItemProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FloatingItemProps<T>>
) => {
  const { as: Tag = 'div', children, closeOnClick, onClick, ...rest } = props
  const { context } = useFloatingContext()

  return (
    <Tag
      onClick={(e) => {
        if (closeOnClick) context.onOpenChange(false)
        onClick?.(e)
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
