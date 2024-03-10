'use client'

import { ElementType, ComponentPropsWithoutRef, useEffect, useId } from 'react'
// import { getPlatform } from '@floating-ui/react/utils'
import { useFloatingContext } from './Floating'

const activeLocks = new Set<string>()

export interface FloatingContentProps<T extends ElementType> {
  as?: T
  lockScroll?: boolean
}

export const FloatingContent = <T extends ElementType>(
  props: FloatingContentProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FloatingContentProps<T>>
) => {
  const { as: Tag = 'div', lockScroll, style, onClick, ...rest } = props
  const { transition, refs, floatingStyles, getFloatingProps } = useFloatingContext()

  const lockId = useId()

  useEffect(() => {
    if (!lockScroll) return
    if (!transition.isMounted) return

    activeLocks.add(lockId)

    // const isIOS = /iP(hone|ad|od)|iOS/.test(getPlatform())
    const bodyStyle = document.body.style
    // RTL <body> scrollbar
    const scrollbarX =
      Math.round(document.documentElement.getBoundingClientRect().left) + document.documentElement.scrollLeft
    const paddingProp = scrollbarX ? 'paddingLeft' : 'paddingRight'
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    // const scrollX = bodyStyle.left ? parseFloat(bodyStyle.left) : window.pageXOffset
    // const scrollY = bodyStyle.top ? parseFloat(bodyStyle.top) : window.pageYOffset

    bodyStyle.overflow = 'hidden'

    if (scrollbarWidth) {
      bodyStyle[paddingProp] = scrollbarWidth + 'px'
    }

    // Only iOS doesn't respect `overflow: hidden` on document.body, and this
    // technique has fewer side effects.
    // if (isIOS) {
    //   // iOS 12 does not support `visualViewport`.
    //   const offsetLeft = window.visualViewport?.offsetLeft || 0
    //   const offsetTop = window.visualViewport?.offsetTop || 0

    //   bodyStyle.position = 'fixed'
    //   bodyStyle.top = -(scrollY - Math.floor(offsetTop)) + 'px'
    //   bodyStyle.left = -(scrollX - Math.floor(offsetLeft)) + 'px'
    //   bodyStyle.right = '0'
    // }

    return () => {
      activeLocks.delete(lockId)

      if (activeLocks.size === 0) {
        bodyStyle.overflow = ''
        bodyStyle[paddingProp] = ''

        // if (isIOS) {
        //   bodyStyle.position = ''
        //   bodyStyle.top = ''
        //   bodyStyle.left = ''
        //   bodyStyle.right = ''
        //   window.scrollTo(scrollX, scrollY)
        // }
      }
    }
  }, [lockId, lockScroll, transition.isMounted])

  if (transition.isMounted) {
    return (
      <Tag
        ref={refs.setFloating}
        {...getFloatingProps(rest)}
        style={{ ...style, ...floatingStyles, ...transition.styles }}
        {...rest}
      />
    )
  }

  return null
}
