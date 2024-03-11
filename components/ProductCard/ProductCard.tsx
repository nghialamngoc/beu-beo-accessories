import { FC } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import { PATH_COLLECTION_DETAIL } from '@/config'
import { toPath } from '@/utils/url'
import { IProduct, IProductImage, IProductPrice } from '@/types'
import { PriceV1 } from '@/components/Price'

export interface ProductCardProps extends IProduct {
  images: IProductImage
  prices: IProductPrice
}

export const ProductCard: FC<ProductCardProps> = ({
  collection,
  images,
  parentSKU,
  sku,
  title,
  size,
  material,
  prices,
}) => {
  return (
    <div className="shadow rounded-[10px] p-10">
      <div className="relative h-[200px] hover:scale-105">
        <Image className="object-contain" src={images.imageUrl ?? ''} fill alt="product image" />
      </div>
      <div>
        <Link
          target={images.target}
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
          <h3 className="text-14 mt-16 font-semibold">{title}</h3>
        </Link>

        <div className="flex flex-col gap-2 text-12 mt-4">
          {size && <div>Kích thước: {size}</div>}
          {material && <div>Chất liệu: {material}</div>}
        </div>

        <div className="mt-10">
          <PriceV1 {...prices} />
        </div>
      </div>
    </div>
  )
}
