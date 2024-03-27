import { z } from 'zod'
import { CategoryFilters } from '../../components/CategoryFilters/CategoryFilters'
import { DefaultPerPage, SORT_ASC, SORT_DESC } from '@/config/common'

const arrayOfString = z
  .array(z.string())
  .transform((args) => args.filter(Boolean))
  .optional()

const stringToArray = z
  .string()
  .trim()
  .transform((value) => (value ? [value] : []))
  .optional()

const sortEnum = z.enum([SORT_ASC, SORT_DESC])

export const parseSearchParams = (
  searchParams?: Record<string, string | string[]>,
  defaultValues?: Partial<CategoryFilters>
): CategoryFilters => {
  const schema = z.object({
    page: z.coerce
      .number()
      .min(1)
      .optional()
      .default(defaultValues?.page || 1)
      .catch(defaultValues?.page || 1),
    perPage: z.coerce
      .number()
      .min(1)
      .max(100)
      .optional()
      .default(defaultValues?.perPage || DefaultPerPage)
      .catch(defaultValues?.perPage || DefaultPerPage),
    sort: sortEnum.optional().default(SORT_ASC).catch(SORT_ASC),
    materials: z
      .union([arrayOfString, stringToArray])
      .default(defaultValues?.materials || [])
      .catch(defaultValues?.materials || []),
    sizes: z
      .union([arrayOfString, stringToArray])
      .default(defaultValues?.sizes || [])
      .catch(defaultValues?.sizes || []),
    // q: z
    //   .string()
    //   .trim()
    //   .optional()
    //   .default(defaultValues?.q || '')
    //   .catch(defaultValues?.q || ''),
  })

  return schema.parse(searchParams)
}
