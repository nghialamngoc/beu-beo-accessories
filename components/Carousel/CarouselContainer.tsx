import { FC, HTMLAttributes } from 'react'
import { useCarouselContext } from './CarouselContext'
import clsx from 'clsx'

export interface CarouselContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const CarouselContainer: FC<CarouselContainerProps> = (props) => {
  const { children, className, ...rest } = props

  const { options } = useCarouselContext()

  return (
    <div
      data-testid="CarouselContainer"
      className={clsx(
        'd-flex align-start select-none',
        {
          'flex-column': options.axis === 'y',
        },
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
