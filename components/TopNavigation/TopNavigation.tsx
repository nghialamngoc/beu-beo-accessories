import clsx from 'clsx'
import { FC } from 'react'
import { TopNavigationDesktop } from './TopNavigationDesktop'
import topNavigationData from '@/dummy/top-navigation.json'
import { TopNavigationMobile } from './TopNavigationMobile'

export interface TopNavigationProps {
  links?: { title: string; href: string; target: string }[]
}

export const TopNavigation: FC<TopNavigationProps> = async ({ links = [] }) => {
  return (
    <div className={clsx('sticky top-0 z-10 border-b border-slate-200 bg-white')}>
      <div className="mx-auto max-w-screen-xl">
        <TopNavigationDesktop links={topNavigationData} />
        <TopNavigationMobile links={topNavigationData} />
      </div>
    </div>
  )
}
