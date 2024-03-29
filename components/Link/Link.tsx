'use client'

import NProgress from 'nprogress'
import NextLink from 'next/link'
import clsx from 'clsx'
import { ComponentProps, forwardRef } from 'react'
import { usePathname } from 'next/navigation'
import { isModifiedEvent } from '@/utils/url'

import { addBasePath } from 'next/dist/client/add-base-path'

function shouldTriggerStartEvent(href: string, clickEvent?: React.MouseEvent) {
  const current = window.location
  const target = new URL(addBasePath(href), location.href)

  if (clickEvent && isModifiedEvent(clickEvent)) {
    return false // modified events: fallback to browser behaviour
  }
  if (current.origin !== target.origin) {
    return false // external URL
  }
  if (current.pathname === target.pathname && current.search === target.search) {
    return false // same URL
  }

  return true
}

NProgress.configure({
  showSpinner: false,
})

export type LinkProps = ComponentProps<typeof NextLink> & {
  activeClassName?: string
  exact?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, prefetch = false, className, activeClassName, exact, onClick, ...props },
  forwardedRef
) {
  const path = usePathname()

  const isActive = exact ? path === href?.toString() : path.startsWith(href?.toString())

  return (
    <NextLink
      ref={forwardedRef}
      href={href}
      prefetch={prefetch}
      className={clsx(className, isActive ? activeClassName : null)}
      onClick={(e) => {
        if (shouldTriggerStartEvent(href.toString(), e)) NProgress.start()
        if (onClick) onClick(e)
      }}
      {...props}
    />
  )
})
