import { FC, HTMLAttributes } from 'react'
import { useCarouselContext } from './CarouselContext'
import clsx from 'clsx'
import styles from './CarouselDots.module.css'

export interface CarouselDotsProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'dot'
  colorScheme?: 'light' | 'dark' | 'light-dark'
}

export const CarouselDots: FC<CarouselDotsProps> = ({
  className,
  variant = 'default',
  colorScheme = 'light',
  ...props
}) => {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarouselContext()

  const styleProps = {
    className: clsx(styles.root, className),
    'data-variant': variant,
    'data-color-scheme': colorScheme,
  }

  return (
    <div data-testid="CarouselDots" {...styleProps} {...props}>
      {scrollSnaps.map((_, index) => (
        <button key={index} data-active={index === selectedIndex} onClick={() => scrollTo(index)} />
      ))}
    </div>
  )
}
