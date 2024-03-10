'use client'

import { BannerItem } from '@/types'
import Carousel, { CarouselDots, CarouselSlide, CarouselViewport } from '../Carousel'
import Image from 'next/image'
import styles from './Banner.module.css'

export const Banner = () => {
  const bannerData: BannerItem[] = [
    {
      desktopImageUrl: '/banner-1.jpeg',
      buttonText: 'Xem ngay',
      href: 'blog/kep-toc-mau-2024-phong-cach-1',
    },
    {
      desktopImageUrl: '/banner-2.jpeg',
      buttonText: 'Xem ngay',
      href: 'blog/kep-toc-mau-2024-phong-cach-2',
    },
    {
      desktopImageUrl: '/banner-3.jpeg',
      buttonText: 'Xem ngay',
      href: 'blog/kep-toc-mau-2024-phong-cach-3',
    },
  ]

  return (
    <div>
      <Carousel
        className={styles.carousel}
        options={{
          autoplay: true,
          duration: 50,
          loop: true,
        }}
      >
        <CarouselViewport>
          <div className={styles.grid}>
            {bannerData.map((x, index) => {
              return (
                <CarouselSlide className={styles.slide} key={index}>
                  <Image src={x.desktopImageUrl ?? ''} fill alt={`banner-${index}`} />
                </CarouselSlide>
              )
            })}
          </div>
        </CarouselViewport>
        <CarouselDots className={styles.dots} />
      </Carousel>
    </div>
  )
}
