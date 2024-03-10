import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import clsx from 'clsx'
import dynamic from 'next/dynamic'
import data from '@/dummy/home-data.json'

const KEYS = {
  CATEGORY_MODULE: 'CategoryModule',
  BLOG_MODULE: 'BlogModule',
}

const SECTION_COMPONENTS = {
  [KEYS.CATEGORY_MODULE]: dynamic(() => import('@/components/HomeCategory')),
  [KEYS.BLOG_MODULE]: dynamic(() => import('@/components/HomeBlog')),
}

export default function Home() {
  const homeData = data

  return (
    <main>
      <Banner />
      <div className="flex flex-col">
        {homeData.map((item, index) => {
          const Component = SECTION_COMPONENTS[item.type]

          if (!Component) {
            return
          }

          return (
            <div
              className={clsx(
                'pb-40 px-16 mx-auto w-full max-w-screen-xl mt-32',
                index !== homeData.length - 1 && 'border-b-2'
              )}
              key={index}
            >
              <Component {...item.data}></Component>
            </div>
          )
        })}
      </div>

      <div className="h-[50px]"></div>

      <Footer />
    </main>
  )
}
