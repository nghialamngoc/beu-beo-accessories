'use client'

import { FC, PropsWithChildren, useRef } from 'react'
import {
  useFloating,
  flip,
  shift,
  offset,
  arrow,
  size,
  FlipOptions,
  ShiftOptions,
  OffsetOptions,
  ArrowOptions,
  UseFloatingOptions,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  useHover,
  UseClickProps,
  UseHoverProps,
  UseDismissProps,
  UseRoleProps,
  safePolygon,
  useTransitionStyles,
} from '@floating-ui/react'
import { createContext } from '@/utils/context'
import { useControllableState } from '@/hooks/use-controllable-state'
import { useEventListener } from '@/hooks/use-event-listener'

export interface FloatingProps extends Omit<UseFloatingOptions, 'middleware'> {
  flip?: FlipOptions
  shift?: ShiftOptions
  offset?: OffsetOptions
  arrow?: ArrowOptions
  size?: 'full'
  click?: UseClickProps
  hover?: UseHoverProps
  role?: UseRoleProps
  dismiss?: UseDismissProps
}

const useFloatingProvider = (props: FloatingProps) => {
  const {
    open,
    onOpenChange,
    flip: flipOptions,
    shift: shiftOptions,
    offset: offsetOptions,
    arrow: arrowOptions,
    click: clickOptions,
    hover: hoverOptions,
    role: roleOptions,
    dismiss: dismissOptions,
    size: floatingSize,
    ...rest
  } = props

  const arrowRef = useRef(null)

  const [isOpen, setOpen] = useControllableState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  })

  const floating = useFloating({
    middleware: [
      flip(flipOptions),
      shift(shiftOptions),
      offset(offsetOptions),
      arrow({ element: arrowRef, ...arrowOptions }),
      size({
        apply: ({ elements, availableHeight }) => {
          if (floatingSize === 'full') {
            elements.floating.style.width = '100vw'
            elements.floating.style.height = availableHeight + 'px'
          }
        },
      }),
    ],
    open: isOpen,
    onOpenChange: setOpen,
    ...rest,
  })

  const click = useClick(floating.context, {
    ...clickOptions,
    ignoreMouse: hoverOptions?.enabled !== false,
  })
  const hover = useHover(floating.context, {
    handleClose: safePolygon(),
    ...hoverOptions,
  })
  const role = useRole(floating.context, roleOptions)
  const dismiss = useDismiss(floating.context, dismissOptions)
  const transition = useTransitionStyles(floating.context, {
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 1,
    },
    close: {
      opacity: 0,
    },
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([click, hover, role, dismiss])

  useEventListener('resize', () => floating.update())

  return { ...floating, arrowRef, transition, isOpen, getReferenceProps, getFloatingProps }
}

export const [FloatingProvider, useFloatingContext] = createContext<ReturnType<typeof useFloatingProvider>>({
  name: 'FloatingContext',
})

export const Floating: FC<PropsWithChildren<FloatingProps>> = ({ children, ...props }) => {
  return <FloatingProvider value={useFloatingProvider(props)}>{children}</FloatingProvider>
}
