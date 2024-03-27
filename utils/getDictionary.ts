import 'server-only'
import type { Locale } from '@/config/common'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  vn: () => import('../dictionaries/vn.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.vn()
