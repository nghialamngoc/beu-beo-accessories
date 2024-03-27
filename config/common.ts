export const i18n = {
  defaultLocale: 'vn',
  locales: ['vn', 'en'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export type CollectionType = 'khan-choang' | 'kep-toc'

export const DefaultPerPage = 8

export const SORT_ASC = 'asc'
export const SORT_DESC = 'desc'
