import { IconFlashSale } from '@/icons/IconFlashSale'
import { formatCurrency } from '@/utils/currency'
import clsx from 'clsx'
import { FC } from 'react'

export interface PriceV1Props {
  initialPrice?: number
  discountPrice?: number
  flashSalePrice?: number
}

interface PriceWithDiscountProps {
  initialPrice: number
  discountPrice?: number
  isFlashSale?: boolean
}

const PriceWithDiscount: FC<PriceWithDiscountProps> = ({ discountPrice = 0, initialPrice = 0, isFlashSale }) => {
  return (
    <div>
      {isFlashSale && (
        <div className="bg-red w-fit px-8 py-2 rounded-[4px]">
          <IconFlashSale width={80} />
        </div>
      )}
      <div className="flex gap-12">
        <span className={clsx('text-18 font-medium', isFlashSale ? 'text-red' : 'text-primary')}>
          {formatCurrency(discountPrice)}
        </span>
        <span className="line-through text-14 text-gray-300">{formatCurrency(initialPrice)}</span>
        <span
          className={clsx(
            'rounded-[2px] px-4 h-[20px] text-white text-12 flex items-center',
            isFlashSale ? 'bg-red' : 'bg-primary'
          )}
        >
          {Math.round(((initialPrice - discountPrice) / initialPrice) * 100)}% giảm
        </span>
      </div>
    </div>
  )
}

export const PriceV1: FC<PriceV1Props> = ({ initialPrice = 0, discountPrice = 0, flashSalePrice }) => {
  const isDiscount = initialPrice !== undefined && discountPrice !== undefined && initialPrice > discountPrice
  const isFlashSale = initialPrice !== undefined && flashSalePrice !== undefined && initialPrice > flashSalePrice

  return (
    <div>
      {isDiscount || isFlashSale ? (
        <PriceWithDiscount
          discountPrice={isFlashSale ? flashSalePrice : discountPrice}
          initialPrice={initialPrice}
          isFlashSale={isFlashSale}
        />
      ) : (
        <div>{formatCurrency(initialPrice)}</div>
      )}
    </div>
  )
}
