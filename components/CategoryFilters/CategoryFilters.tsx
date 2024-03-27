import clsx from 'clsx'
import queryString from 'query-string'
import { FC } from 'react'
import { Link } from '@/components/Link'
import { IconXCircle } from '@/icons/IconXCircle'
import { getFiltersConfig } from '@/utils/getFiltersConfig'

export interface CategoryFilters {
  page: number
  perPage: number
  materials: string[]
  sizes: string[]
  sort: 'asc' | 'desc'
  // q: string
}

const getFilterUrl = (pathname: string, filters: CategoryFilters) => {
  const search = queryString.stringify(
    { ...filters, page: undefined, perPage: undefined },
    {
      skipNull: true,
      skipEmptyString: true,
    }
  )

  return pathname + (search ? '?' + search : '')
}

const toggle = <T,>(array: T[], value: T) => {
  const clone = [...array]
  const index = clone.indexOf(value)
  if (index === -1) clone.push(value)
  if (index !== -1) clone.splice(index, 1)
  return clone
}

export interface CategoryFiltersProps {
  category: string
  pathname: string
  filters: CategoryFilters
  searchParams?: Record<string, string | string[]>
  defaultFilters?: Partial<CategoryFilters>
}

export const CategoryFilters: FC<CategoryFiltersProps> = async (props) => {
  const { category, pathname, filters, defaultFilters } = props

  const controls = getFiltersConfig(category, defaultFilters)

  return (
    <div className="flex flex-col gap-10">
      {controls.map(({ key, label, values }, index) => {
        const filterValue = filters[key as keyof CategoryFilters]
        const isArray = Array.isArray(filterValue)
        const sorted = [...values]
        // const sorted = [...values].sort((a) => {
        //   // Move the selected item to the beginning
        //   if (isArray ? filterValue.includes(a.id as never) : filterValue === a.id) return -1
        //   return 0
        // })

        return (
          <div key={key + index} className="flex items-start gap-8">
            <div className="w-40 sm:w-128 shrink-0 flex items-center gap-8 pt-4">
              {/* <Icon className="w-20 h-20 shrink-0 text-slate-500" aria-label={label} /> */}
              <h2 className="hidden sm:block text-slate-500 dark:text-slate-400">{label}:</h2>
            </div>
            <div className="flex items-center grow gap-x-16 gap-y-8 pb-6 overflow-x-auto md:flex-wrap">
              {sorted.map(({ id, label }) => {
                const isActive = isArray ? filterValue.includes(id as never) : filterValue === id
                return (
                  <Link
                    rel="nofollow"
                    key={key + id}
                    href={getFilterUrl(pathname, {
                      ...filters,
                      [key]: isArray ? toggle(filterValue, id) : id,
                    })}
                    className={clsx(
                      'flex items-center gap-8 px-8 py-4 rounded-16 whitespace-nowrap text-14 transition-color duration-100 sm:text-16',
                      isActive
                        ? 'bg-blue-500 text-white hover:bg-blue-500/80 active:bg-blue-500/80'
                        : 'hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white'
                    )}
                    title={label}
                  >
                    {label}
                    {isActive && isArray && <IconXCircle className="w-20 h-20 shrink-0" />}
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
