import { FC } from 'react'
import { IProduct } from '@/types'
import { IconArrowRight } from '@/icons/IconArrowRight'
import Link from '../Link'
import { toPath } from '@/utils/url'
import { PATH_COLLECTION, PATH_COLLECTION_DETAIL } from '@/config'
import Image from 'next/image'
import { PriceV1 } from '../Price'
import productJson from '@/dummy/product.json'
import productImagesJson from '@/dummy/product-images.json'
import productPricesJson from '@/dummy/product-prices.json'

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
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-32 mt-24">
        {items
          .reduce((pre, current) => {
            const product = productJson.find((x) => x.sku === current)
            return product ? [...pre, product] : [...pre]
          }, [] as IProduct[])
          .map(({ sku, parentSKU, title, size, material }, index) => {
            const image = productImagesJson?.find((x) => x.sku === sku)

            const prices = productPricesJson?.find((x) => x.sku === sku || x.sku === parentSKU)?.prices

            return (
              <div key={index}>
                <div className="relative h-[200px] hover:scale-105">
                  <Image className="object-contain" src={image?.imageUrl ?? ''} fill alt="product image" />
                </div>
                <Link
                  href={toPath(PATH_COLLECTION_DETAIL, {
                    params: {
                      collection,
                      sku: parentSKU,
                    },
                    query: {
                      ...(sku !== parentSKU
                        ? {
                            variationId: sku,
                          }
                        : {}),
                    },
                  })}
                >
                  <h3 className="text-14 mt-10 font-semibold">{title}</h3>
                </Link>

                <div className="flex flex-col gap-2 text-12 mt-4">
                  {size && <div>Kích thước: {size}</div>}
                  {material && <div>Chất liệu: {material}</div>}
                </div>

                <div className="mt-10">
                  <PriceV1 {...prices} />
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
