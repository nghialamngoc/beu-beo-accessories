import { RouterPagination } from '@/components/Pagination/RouterPagination'
import { PATH_API_CATEGORY } from '@/config/paths'
import queryString from 'query-string'
import { schema } from './page.schema'
import ProductCard from '@/components/ProductCard'

export interface CategoryProps {
  params: {
    category: string
  }
  searchParams: {
    page?: number
    perPage?: number
  }
}

export default async function Category({ params, searchParams }: CategoryProps) {
  const category = params.category

  const { perPage, page } = schema.parse(searchParams)

  const res = await fetch(
    queryString.stringifyUrl({
      url: process.env.BASE_URL + PATH_API_CATEGORY,
      query: {
        id: category,
        page,
        perPage,
      },
    }),
    {
      next: {
        revalidate: 60,
      },
    }
  )

  const dataJson = await res.json()

  const { data, total } = dataJson

  return (
    <div className="m-auto w-full max-w-screen-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-32 my-24">
        {data.map((x: any, index: number) => {
          return <ProductCard key={index} {...x}></ProductCard>
        })}
      </div>

      <RouterPagination perPage={perPage} total={total} />
    </div>
  )
}
