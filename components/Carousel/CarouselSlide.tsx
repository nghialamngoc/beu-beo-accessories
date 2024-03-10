import { forwardRef, HTMLAttributes } from 'react'
import styles from './CarouselSlide.module.css'

export const CarouselSlide = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function CarouselSlideRef(
  { children, className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-testid="CarouselSlide"
      className={[styles.root, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
})
