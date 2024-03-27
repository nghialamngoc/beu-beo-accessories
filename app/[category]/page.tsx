import { RouterPagination } from '@/components/Pagination/RouterPagination'
import { PATH_API_CATEGORY, PATH_HOME } from '@/config/paths'
import queryString from 'query-string'
import ProductCard from '@/components/ProductCard'
import Breadcrumb from '@/components/Breadcrumb'
import { useTranslation } from '@/hooks/use-translation'
import { JsonLd } from '@/components/JsonLd'
import { Person, WithContext } from 'schema-dts'
import { getPath } from '@/utils/getPath'
import { CollectionType } from '@/config/common'
import { CategoryFilters } from '@/components/CategoryFilters'
import { parseSearchParams } from './parseSearchParams'
import { clsx } from 'clsx'

export interface CategoryProps {
  params: {
    category: CollectionType
  }
  searchParams: Record<string, string | string[]>
}

export default async function Category({ params, searchParams }: CategoryProps) {
  const t = useTranslation()

  const { category } = params

  const filters = parseSearchParams(searchParams)

  const res = await fetch(
    queryString.stringifyUrl({
      url: process.env.BASE_URL + PATH_API_CATEGORY,
      query: {
        id: category,
        ...filters,
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

  const jsonLd: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': getPath(category),
    name: t(category),
  }

  return (
    <div>
      <JsonLd data={jsonLd} />

      <Breadcrumb
        className="mt-24 m-auto w-full max-w-screen-xl"
        links={[
          { title: 'Trang chủ', href: PATH_HOME },
          {
            title: t(category),
            href: '',
          },
        ]}
      />

      <div
        className={clsx(
          'relative py-16 mt-16',
          'after:absolute after:-z-1 after:inset-y-0 after:-inset-x-0 after:bg-slate-100'
        )}
      >
        <div className="m-auto w-full max-w-screen-xl">
          <CategoryFilters pathname={getPath(category)} category={category} filters={filters} />
        </div>
      </div>

      <div className="m-auto w-full max-w-screen-xl">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-32 my-24">
            {data.map((x: any, index: number) => {
              return <ProductCard key={index} {...x}></ProductCard>
            })}
          </div>
        ) : (
          <div className="mt-24">Hiện tại không có sản phẩm nào!</div>
        )}
        <RouterPagination perPage={filters.perPage} total={total} />
      </div>
    </div>
  )
}
