import { createContext } from '@/utils/context'
import { useCarousel } from './use-carousel'

export const [CarouselProvider, useCarouselContext] = createContext<ReturnType<typeof useCarousel>>({
  name: 'CarouselContext',
})
