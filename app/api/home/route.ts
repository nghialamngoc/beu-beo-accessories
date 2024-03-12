import { NextRequest } from 'next/server'
import { ZodError } from 'zod'
import homeDummyData from '@/dummy/home-data.json'
import queryString from 'query-string'
import { PATH_API_BLOG, PATH_API_PRODUCT } from '@/config/paths'
import { KEYS } from '@/config/constants'

export const revalidate = 60

export async function GET(request: NextRequest) {
  try {
    const dummyData = homeDummyData

    const formatData = []

    for (let i = 0; i < dummyData.length; i++) {
      const x = dummyData[i]
      const items = []
      for (let index = 0; index < x.data.items.length; index++) {
        const sku = x.data.items[index]
        let item

        switch (x.type) {
          case KEYS.CATEGORY_MODULE:
            item = await fetch(
              queryString.stringifyUrl({
                url: process.env.BASE_URL + PATH_API_PRODUCT + sku,
              })
            )
            break
          case KEYS.BLOG_MODULE:
            item = await fetch(
              queryString.stringifyUrl({
                url: process.env.BASE_URL + PATH_API_BLOG + sku,
              })
            )
            break
          default:
            break
        }

        const dataJson = await item?.json()

        if (Object.keys(dataJson).length > 0) {
          items.push(dataJson)
        }
      }

      formatData.push({
        ...x,
        data: {
          ...x.data,
          items,
        },
      })
    }

    return Response.json([...formatData])
  } catch (error) {
    return Response.json(
      { status: 400 },
      {
        status: error instanceof ZodError ? 400 : 500,
      }
    )
  }
}
