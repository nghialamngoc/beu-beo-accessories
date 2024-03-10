import { FC, HTMLAttributes } from 'react'
import { useCarouselContext } from './CarouselContext'
import styles from './CarouselViewport.module.css'

export const CarouselViewport: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  const { emblaRef } = useCarouselContext()

  const styleProps = {
    className: [styles.root, className].filter(Boolean).join(' '),
  }

  return (
    <div ref={emblaRef} {...styleProps} {...props}>
      {children}
    </div>
  )
}
