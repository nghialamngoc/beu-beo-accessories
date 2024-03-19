'use client'

import clsx from 'clsx'
import { FC } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { getPages } from './get-pages'
import Link from '../Link'

const parsePage = (page: string | null) => {
  if (page) {
    const parsed = Number(page)

    if (!isNaN(parsed) && parsed > 0) {
      return parsed
    }
  }
  return 1
}

export interface RouterPaginationProps {
  perPage: number
  total: number
  className?: string
  hash?: string
}

export const RouterPagination: FC<RouterPaginationProps> = ({ perPage, total, className, hash }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = parsePage(searchParams.get('page'))

  const pages = getPages({
    page,
    total: Math.ceil(total / perPage),
  })

  if (pages.length > 1) {
    return (
      <div className={clsx('flex items-center justify-center gap-8', className)}>
        {pages.map((p, index) => {
          const key = p + '-' + index

          if (p !== 'dots') {
            const search = new URLSearchParams(searchParams.toString())
            search.set('page', p.toString())

            return (
              <Link
                key={key}
                href={pathname + '?' + search.toString() + (hash ? '#' + hash : '')}
                rel={page + 1 === p ? 'next' : page - 1 === p ? 'prev' : undefined}
                className={clsx(
                  'flex items-center justify-center font-bold shadow px-12 py-6 rounded-8',
                  'hover:bg-primary hover:text-white',
                  'active:bg-primary active:text-white',
                  {
                    'bg-primary text-white pointer-events-none': p === page,
                  }
                )}
              >
                {p}
              </Link>
            )
          }

          return (
            <div key={key} className="px-6">
              ...
            </div>
          )
        })}
      </div>
    )
  }

  return null
}
