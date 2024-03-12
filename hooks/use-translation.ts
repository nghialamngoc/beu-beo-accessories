import get from 'lodash/get'
import templite from 'templite'
import langDict from '@/dictionaries/vn.json'

export const useTranslation = () => {
  const t = (key: any, params: Record<string, any> = {}) => {
    if (typeof key === 'string') {
      const value = get(langDict, key)
      return value ? templite(value, params) : key
    }
    return ''
  }

  return t
}
