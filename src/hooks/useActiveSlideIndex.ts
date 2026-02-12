import { useState, useEffect, useRef, type RefObject } from 'react'

export function useActiveSlideIndex(
  slideRefs: RefObject<(HTMLDivElement | null)[]>,
  count: number,
): number {
  const [activeIndex, setActiveIndex] = useState(0)
  const ratioMap = useRef(new Map<Element, number>())

  useEffect(() => {
    const refs = slideRefs.current
    if (!refs) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratioMap.current.set(entry.target, entry.intersectionRatio)
        }

        let bestIndex = 0
        let bestRatio = -1
        refs.forEach((el, i) => {
          if (!el) return
          const ratio = ratioMap.current.get(el) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestIndex = i
          }
        })

        if (bestRatio > 0) {
          setActiveIndex(bestIndex)
        }
      },
      {
        rootMargin: '-35% 0px -35% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    refs.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [slideRefs, count])

  return activeIndex
}
