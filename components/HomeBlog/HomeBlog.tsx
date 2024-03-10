import { FC } from 'react'
import { IBlog } from '@/types'
import { IconArrowRight } from '@/icons/IconArrowRight'
import Link from '../Link'
import { toPath } from '@/utils/url'
import { PATH_BLOG, PATH_BLOG_DETAIL } from '@/config'
import Image from 'next/image'
import blogJson from '@/dummy/blog.json'

interface HomeBlogProps {
  title: string
  collection: string
  items: string[]
}

export const HomeBlog: FC<HomeBlogProps> = (props) => {
  const { title, collection, items } = props

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-20">{title}</h2>
        <div>
          <Link
            href={toPath(PATH_BLOG, {
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
            const product = blogJson.find((x) => x.id === current)
            return product ? [...pre, product] : [...pre]
          }, [] as IBlog[])
          .map(({ id, title, banner, createdDate }, index) => {
            return (
              <div key={index}>
                <div className="relative h-[200px]">
                  <Image className="object-contain" src={banner ?? ''} fill alt="product image" />
                </div>
                <div className="text-12 mt-10 text-gray-400">{createdDate}</div>
                <Link
                  href={toPath(PATH_BLOG_DETAIL, {
                    params: {
                      id,
                    },
                  })}
                >
                  <h3 className="text-14 mt-4 font-semibold">{title}</h3>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}
