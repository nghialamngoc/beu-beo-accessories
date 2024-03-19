import clsx from 'clsx'
import { FC } from 'react'
import { TopNavigationDesktop } from './TopNavigationDesktop'
import { TopNavigationMobile } from './TopNavigationMobile'
import { PATH_API_TOP_NAVIGATION } from '@/config/paths'
import queryString from 'query-string'

export interface TopNavigationProps {}

export const TopNavigation: FC<TopNavigationProps> = async () => {
  const data = await fetch(
    queryString.stringifyUrl({
      url: process.env.BASE_URL + PATH_API_TOP_NAVIGATION,
    }),
    {
      next: {
        revalidate: 60,
      },
    }
  )

  const dataJson = await data.json()

  return (
    <div className={clsx('sticky top-0 z-10 border-b border-slate-200 bg-white')}>
      <div className="mx-auto max-w-screen-xl">
        <TopNavigationDesktop links={dataJson} />
        <TopNavigationMobile links={dataJson} />
      </div>
    </div>
  )
}
