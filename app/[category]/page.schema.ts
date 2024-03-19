import { z } from 'zod'

export const schema = z.object({
  page: z.coerce.number().min(1).default(1).catch(1),
  perPage: z.coerce.number().min(1).max(100).default(8).catch(8),
})
