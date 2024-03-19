import { NextRequest } from 'next/server'
import { ZodError } from 'zod'
import productJSON from '@/dummy/product.json'
import productPriceJSON from '@/dummy/product-prices.json'
import productImagesJSON from '@/dummy/product-images.json'

export const revalidate = 60

const PAGE = '1'
const PERPAGE = '8'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || PAGE)
    const perPage = parseInt(searchParams.get('perPage') || PERPAGE)
    const id = searchParams.get('id')

    if (!id) {
      return Response.json({
        data: [],
        total: 0,
      })
    }

    const products = productJSON
      .filter((x) => x.categories?.includes(id))
      .reduce((pre: any, current: any) => {
        const prices = productPriceJSON.find((x) => x.sku === current.sku || x.sku === current.parentSKU)
        const images = productImagesJSON.find((x) => x.sku === current.sku || x.sku === current?.parentSKU)

        return [
          ...pre,
          {
            ...current,
            ...prices,
            ...images,
          },
        ]
      }, [])

    return Response.json({
      data: products.slice((page - 1) * perPage, page * perPage),
      total: products.length,
      page,
      perPage,
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
