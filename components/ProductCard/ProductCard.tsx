import { FC } from 'react'
import Image from 'next/image'
import Link from '@/components/Link'
import { PATH_COLLECTION_DETAIL } from '@/config/paths'
import { toPath } from '@/utils/url'
import { IProduct } from '@/types'
import { PriceV1 } from '@/components/Price'
import { useTranslation } from '@/hooks/use-translation'

export interface ProductCardProps extends IProduct {}

export const ProductCard: FC<ProductCardProps> = async ({
  collection,
  imageUrl,
  parentSKU,
  sku,
  title,
  size,
  material,
  prices,
}) => {
  const t = useTranslation()

  return (
    <div className="shadow rounded-[10px] p-10 pb-20">
      <div className="relative h-[200px] hover:scale-105">
        <Image className="object-contain" src={imageUrl ?? ''} fill alt="product image" />
      </div>
      <div>
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
          <h3 className="text-14 mt-16 font-semibold">{title}</h3>
        </Link>

        <div className="flex flex-col gap-2 text-12 mt-4">
          {size && <div>Kích thước: {t(size)}</div>}
          {material && <div>Chất liệu: {t(material)}</div>}
        </div>

        <div className="mt-10">
          <PriceV1 {...prices} />
        </div>
      </div>
    </div>
  )
}
