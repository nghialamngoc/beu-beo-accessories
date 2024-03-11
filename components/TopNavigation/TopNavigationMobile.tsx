import { FC } from 'react'
import clsx from 'clsx'
import { PATH_HOME } from '@/config/paths'
import Link from '@/components/Link'
import { IconHome } from '@/icons/IconHome'
import { Floating, FloatingTrigger, FloatingContent, FloatingItem } from '@/components/Floating'
import { IconSquares } from '@/icons/IconSquares'
import { IconArrowRight } from '@/icons/IconArrowRight'

export interface TopNavigationMobileProps {
  links: {
    title: string
    href: string
    target?: string
    children?: {
      title: string
      href: string
      target?: string
    }[]
  }[]
}

export const TopNavigationMobile: FC<TopNavigationMobileProps> = async ({ links }) => {
  return (
    <nav className={clsx('flex gap-8 items-center ml-8', 'md:hidden')}>
      <Link href={PATH_HOME} title="Trang chủ">
        <IconHome className="w-24 h-24" />
      </Link>
      <Floating size="full" hover={{ enabled: false }}>
        <FloatingTrigger className="rounded-4 px-12 py-8" aria-label="Liên kết">
          <IconSquares className="w-24 h-24" />
        </FloatingTrigger>

        <FloatingContent lockScroll className={clsx('bg-white shadow px-12 border-t border-slate-200 overflow-y-auto')}>
          {links.map((link, index) => {
            return link.children?.length ? (
              <div key={index}>
                <div className={clsx('flex items-center gap-4 py-10 border-b border-slate-200')}>
                  <span className="font-semibold">{link.title}</span>
                  <IconArrowRight className="w-16 h-16 ml-auto" />
                </div>
                <div className={clsx('grid grid-cols-1', 'sm:grid-cols-3', 'lg:grid-cols-4')}>
                  {link.children.map((category, i) => (
                    <div
                      key={i}
                      className={clsx('flex flex-col border-b border-dotted border-slate-200', 'dark:border-slate-700')}
                    >
                      <FloatingItem
                        as={Link}
                        closeOnClick
                        href={category.href}
                        className="flex items-center text-14 gap-8 py-8 hover:text-primary active:text-primary"
                      >
                        <span>{category.title}</span>
                      </FloatingItem>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <FloatingItem
                as={Link}
                closeOnClick
                key={index}
                {...link}
                className={clsx(
                  'flex items-center gap-4 font-semibold py-10 border-b border-slate-200',
                  'hover:text-primary active:text-primary'
                )}
              >
                {link.title}
                <IconArrowRight className="w-16 h-16 ml-auto" />
              </FloatingItem>
            )
          })}

          {/* <div className={clsx('flex items-center gap-4 py-10 border-b border-slate-200', 'dark:border-slate-700')}>
          <span className="font-semibold">Thể loại</span>
          <IconArrowRight className="w-16 h-16 ml-auto" />
        </div>
        <div className={clsx('grid grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4')}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={clsx('flex flex-col border-b border-dotted border-slate-200', 'dark:border-slate-700')}
            >
              <FloatingItem
                as={Link}
                closeOnClick
                href={toPath(PATH_CATEGORY_VIEW, { params: { categoryId: category.id } })}
                title={category.name}
                className="flex items-center gap-8 py-8 hover:text-primary active:text-primary"
              >
                <span>{category.name}</span>
                <span className="text-14">({category._count.novels})</span>
              </FloatingItem>
            </div>
          ))}
        </div> */}
        </FloatingContent>
      </Floating>
    </nav>
  )
}
