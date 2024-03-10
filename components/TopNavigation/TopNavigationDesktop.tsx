import { FC } from 'react'
import clsx from 'clsx'
import { PATH_HOME } from '@/config/paths'
import Link from '@/components/Link'
import { IconHome } from '@/icons/IconHome'
import { Floating, FloatingTrigger, FloatingContent, FloatingArrow } from '@/components/Floating'

export interface TopNavigationDesktopProps {
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

export const TopNavigationDesktop: FC<TopNavigationDesktopProps> = async ({ links }) => {
  return (
    <nav className="hidden md:flex items-stretch overflow-x-auto">
      <Link
        href={PATH_HOME}
        title="Trang chủ"
        className={clsx('flex items-center font-semibold py-10 px-16', 'hover:text-primary active:text-primary')}
      >
        <IconHome className="w-28 h-28" />
      </Link>

      {links.map((link, index) => {
        return link.children?.length ? (
          <Floating placement="bottom-start" key={index}>
            <FloatingTrigger
              as="button"
              aria-label={link.title}
              className={clsx('hover:text-primary active:text-primary')}
            >
              <Link
                {...link}
                prefetch={true}
                className={clsx(
                  'flex items-center font-semibold py-10 px-16',
                  'hover:text-primary active:text-primary'
                )}
                activeClassName="text-primary"
              >
                {link.title}
              </Link>
            </FloatingTrigger>
            <FloatingContent>
              <FloatingArrow className="fill-slate-300" />
              <div className={clsx('bg-white shadow-md p-16 overflow-y-auto border-t-2 border-slate-300')}>
                {link.children.map((category, i) => (
                  <div key={i} className="flex flex-col p-8 border-b">
                    <Link
                      className={clsx('flex items-center gap-12', 'hover:text-primary active:text-primary')}
                      href={category.href}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-500" />
                      <span className="font-semibold">{category.title}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </FloatingContent>
          </Floating>
        ) : (
          <Link
            key={index}
            {...link}
            prefetch={true}
            className={clsx('flex items-center font-semibold py-10 px-16', 'hover:text-primary active:text-primary')}
            activeClassName="text-primary"
          >
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
}
