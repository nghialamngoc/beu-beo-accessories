import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoHeight, { AutoHeightOptionsType } from 'embla-carousel-auto-height'
import Autoplay, { AutoplayOptionsType } from 'embla-carousel-autoplay'
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel'

Autoplay.globalOptions = { delay: 6000 }

export interface UseCarouselProps extends EmblaOptionsType {
  autoHeight?: AutoHeightOptionsType | boolean
  autoplay?: AutoplayOptionsType | boolean
}

export const useCarousel = (props?: UseCarouselProps) => {
  const { autoHeight, autoplay, ...rest } = props ?? {}

  const plugins: (EmblaPluginType | null)[] = [
    autoHeight ? AutoHeight(autoHeight !== true ? autoHeight : undefined) : null,
    autoplay ? Autoplay(autoplay !== true ? autoplay : undefined) : null,
  ]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...rest,
    },
    plugins.filter((x): x is EmblaPluginType => x !== null)
  )

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList())
      setSelectedIndex(emblaApi.selectedScrollSnap())
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (emblaApi) {
      onSelect()
      emblaApi.on('select', onSelect)
      emblaApi.on('reInit', onSelect)
      emblaApi.on('resize', onSelect)
    }

    return () => {
      emblaApi?.off('select', onSelect)
      emblaApi?.off('reInit', onSelect)
      emblaApi?.off('resize', onSelect)
    }
  }, [emblaApi, setScrollSnaps, onSelect])

  return {
    emblaRef,
    emblaApi,
    scrollNext,
    scrollPrev,
    scrollTo,
    canScrollPrev,
    canScrollNext,
    selectedIndex,
    scrollSnaps,
    options: rest,
  }
}
