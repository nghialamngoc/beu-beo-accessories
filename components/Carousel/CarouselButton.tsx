import { ButtonHTMLAttributes, FC } from 'react'
import { useCarouselContext } from './CarouselContext'
import clsx from 'clsx'
import styles from './CarouselButton.module.css'

export interface CarouselButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isHideOnMobile?: boolean
  position?: 'top' | 'middle' | 'bottom'
  variation?: 'default' | 'circle'
}

export const CarouselPrevButton: FC<CarouselButtonProps> = ({
  className,
  isHideOnMobile,
  position = 'middle',
  variation = 'default',
  ...props
}) => {
  const { canScrollPrev, scrollPrev } = useCarouselContext()

  return (
    <button
      className={clsx(styles.root, className, styles.prev, {
        [styles.circle]: variation === 'circle',
        [styles.isHideOnMobile]: isHideOnMobile,
        [styles.top]: position === 'top',
        [styles.bottom]: position === 'bottom',
        [styles.middle]: position === 'middle',
      })}
      {...props}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
    >
      <svg width="21" height="33" viewBox="0 0 21 33" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.2928 31.464L-0.000183105 16.171L15.2928 0.879C16.4638 -0.293 18.3638 -0.293 19.5358 0.879L20.2418 1.585L5.65582 16.171L20.2418 30.757L19.5358 31.464C18.3638 32.635 16.4638 32.635 15.2928 31.464Z"
          fill="#E87722"
        ></path>
      </svg>
    </button>
  )
}

export const CarouselNextButton: FC<CarouselButtonProps> = ({
  className,
  isHideOnMobile,
  position = 'middle',
  variation = 'default',
  ...props
}) => {
  const { canScrollNext, scrollNext } = useCarouselContext()

  return (
    <button
      className={clsx(styles.root, className, styles.next, {
        [styles.circle]: variation === 'circle',
        [styles.isHideOnMobile]: isHideOnMobile,
        [styles.top]: position === 'top',
        [styles.bottom]: position === 'bottom',
        [styles.middle]: position === 'middle',
      })}
      {...props}
      disabled={!canScrollNext}
      onClick={scrollNext}
    >
      <svg width="21" height="33" viewBox="0 0 21 33" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.707 31.464L0 30.757L14.586 16.171L0 1.585L0.707 0.879C1.878 -0.293 3.778 -0.293 4.95 0.879L20.242 16.171L4.95 31.464C3.778 32.635 1.878 32.635 0.707 31.464Z"
          fill="#E87722"
        ></path>
      </svg>
    </button>
  )
}
