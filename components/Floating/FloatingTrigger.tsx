'use client'

import { ElementType, ComponentPropsWithoutRef } from 'react'
import { useFloatingContext } from './Floating'

export interface FloatingTriggerProps<T extends ElementType> {
  as?: T
}

export const FloatingTrigger = <T extends ElementType>(
  props: FloatingTriggerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FloatingTriggerProps<T>>
) => {
  const { as: Tag = 'button', ...rest } = props
  const { refs, getReferenceProps } = useFloatingContext()

  return <Tag ref={refs.setReference} {...getReferenceProps(rest)} {...rest} />
}
