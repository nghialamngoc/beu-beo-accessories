import { KhanChoangFilters } from '@/config/fitlers'

export const getFiltersConfig = (category: string, defaultFilters?: any) => {
  let filters = [
    {
      key: 'sort',
      label: 'Sắp xếp',
      icon: '',
      values: [
        { id: 'asc', label: 'Giá tăng dần' },
        { id: 'desc', label: 'Giá giảm dần' },
      ],
    },
  ]

  switch (category) {
    case 'khan-choang':
      filters = KhanChoangFilters as any
      break

    default:
      break
  }

  return filters
}
