import { useLayoutEffect, useEffect } from 'react'

export const useSafeEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
