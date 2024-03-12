import { NextRequest } from 'next/server'
import { ZodError } from 'zod'
import productData from '@/dummy/product.json'
import productPriceData from '@/dummy/product-prices.json'
import productImagesData from '@/dummy/product-images.json'

export const revalidate = 60

export async function GET(request: NextRequest, { params }: { params: { sku: string } }) {
  try {
    const sku = params.sku
    const product = productData.find((x) => x.sku === sku)

    const prices = productPriceData.find((x) => x.sku === sku || x.sku === product?.parentSKU)
    const images = productImagesData.find((x) => x.sku === sku || x.sku === product?.parentSKU)

    return Response.json({
      ...product,
      ...prices,
      ...images,
    })
  } catch (error) {
    return Response.json(
      { status: 400 },
      {
        status: error instanceof ZodError ? 400 : 500,
      }
    )
  }
}
