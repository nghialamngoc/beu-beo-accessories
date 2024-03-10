import clsx from 'clsx'
import { FC } from 'react'
import { TopNavigationDesktop } from './TopNavigationDesktop'

export interface TopNavigationProps {
  links?: { title: string; href: string; target: string }[]
}

export const TopNavigation: FC<TopNavigationProps> = async ({ links = [] }) => {
  return (
    <div className={clsx('sticky top-0 z-10 border-b border-slate-200 bg-white')}>
      <div className="mx-auto max-w-screen-xl">
        <TopNavigationDesktop
          links={[
            {
              title: 'Khăn lụa',
              href: 'khan-lua',
              target: '',
              children: [
                {
                  title: 'Kích thước 6 * 12',
                  href: '/khan-lua?size=6*12',
                },
                {
                  title: 'Kích thước 53 * 53',
                  href: '/khan-lua?size=53*53',
                },
              ],
            },
            {
              title: 'Kẹp tóc',
              href: 'kep-toc',
              target: '',
            },
            {
              title: 'Liên hệ',
              href: 'lien-he',
              target: '',
            },
            {
              title: 'Bài viết',
              href: 'bai-viet',
              target: '',
            },
          ]}
        />
      </div>
    </div>
  )
}
