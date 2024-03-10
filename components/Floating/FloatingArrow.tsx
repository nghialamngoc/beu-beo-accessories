'use client'

import { FC } from 'react'
import { FloatingArrow as BaseFloatingArrow, FloatingArrowProps } from '@floating-ui/react'
import { useFloatingContext } from './Floating'

export const FloatingArrow: FC<Omit<FloatingArrowProps, 'context'>> = (props) => {
  const { context, arrowRef } = useFloatingContext()

  return <BaseFloatingArrow ref={arrowRef} context={context} className="fill-white" {...props} />
}
