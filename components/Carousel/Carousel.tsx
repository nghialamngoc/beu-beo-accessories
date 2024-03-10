import { forwardRef, HTMLAttributes } from 'react'

import { useCarousel, UseCarouselProps } from './use-carousel'
import { CarouselProvider } from './CarouselContext'
import styles from './Carousel.module.css'
import clsx from 'clsx'

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  options?: UseCarouselProps
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(function CarouselRef(props, ref) {
  const { children, options, className, ...rest } = props
  const context = useCarousel(options)

  return (
    <CarouselProvider value={context}>
      <div ref={ref} className={clsx(styles.root, className)} {...rest}>
        {children}
      </div>
    </CarouselProvider>
  )
})

export default Carousel
