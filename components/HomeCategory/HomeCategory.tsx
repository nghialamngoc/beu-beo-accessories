import { FC } from 'react'
import { IProduct } from '@/types'
import { IconArrowRight } from '@/icons/IconArrowRight'
import Link from '../Link'
import { toPath } from '@/utils/url'
import { PATH_COLLECTION } from '@/config'
import productJson from '@/dummy/product.json'
import productImagesJson from '@/dummy/product-images.json'
import productPricesJson from '@/dummy/product-prices.json'
import ProductCard from '@/components/ProductCard'

interface HomeCategoryProps {
  title: string
  collection: string
  items: string[]
}

export const HomeCategory: FC<HomeCategoryProps> = (props) => {
  const { title, collection, items } = props

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-20">{title}</h2>
        <div>
          <Link
            href={toPath(PATH_COLLECTION, {
              params: {
                collection,
              },
            })}
            className="flex gap-8 text-14 hover:text-primary"
          >
            Xem thêm <IconArrowRight width={14} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-32 mt-24">
        {items
          .reduce((pre, current) => {
            const product = productJson.find((x) => x.sku === current)
            return product ? [...pre, product] : [...pre]
          }, [] as IProduct[])
          .map((item, index) => {
            const image = productImagesJson?.find((x) => x.sku === item.sku)
            const prices = productPricesJson?.find((x) => x.sku === item.sku || x.sku === item.parentSKU)?.prices

            return <ProductCard key={index} {...item} images={image as any} prices={prices as any} />
          })}
      </div>
    </div>
  )
}
