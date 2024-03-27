import { CollectionType } from '@/config/common'
import { toPath } from './url'
import { PATH_KEP_TOC, PATH_KEP_TOC_DETAIL, PATH_KHAN_CHOANG_CO, PATH_KHAN_CHOANG_CO_DETAIL } from '@/config/paths'

export const getPath = (type: CollectionType, sku?: string) => {
  switch (type) {
    case 'khan-choang':
      return sku
        ? toPath(PATH_KHAN_CHOANG_CO_DETAIL, { params: { sku }, baseUrl: true })
        : toPath(PATH_KHAN_CHOANG_CO, { baseUrl: true })
    case 'kep-toc':
      return sku
        ? toPath(PATH_KEP_TOC_DETAIL, { params: { sku }, baseUrl: true })
        : toPath(PATH_KEP_TOC, { baseUrl: true })
    default:
      return ''
  }
}
