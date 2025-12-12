import * as React from 'react'
import { motion, useAnimation } from 'framer-motion'

interface MarqueeProps<T = unknown> {
  items: T[]
  renderItem?: (item: T, idx: number) => React.ReactNode
  direction?: 'left' | 'right'
  speed?: number // pixels per second
  duplicates?: number
  className?: string
  debug?: boolean
}

export function Marquee<T>({
  items,
  renderItem,
  direction = 'left',
  speed = 40,
  duplicates = 3,
  className = '',
  debug = false,
}: MarqueeProps<T>) {
  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const [singleWidth, setSingleWidth] = React.useState<number | null>(null)
  const controls = useAnimation()

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  React.useLayoutEffect(() => {
    function measure() {
      if (!trackRef.current) return
      const total = trackRef.current.scrollWidth
      // track contains duplicates.length number of items
      let width = total / duplicates
      // fallback: if total is 0 (or measurement failed), try to compute width from children
      if (!width || width === 0) {
        const children = trackRef.current.children
        if (children && children.length >= items.length) {
          let sumWidths = 0
          for (let i = 0; i < items.length; i++) {
            const el = children[i] as HTMLElement
            const rect = el.getBoundingClientRect()
            sumWidths += rect.width
          }
          // attempt to compute gap between first two elements if present
          let gap = 0
          if (children.length > 1) {
            const first = children[0] as HTMLElement
            const second = children[1] as HTMLElement
            gap = second.offsetLeft - (first.offsetLeft + first.offsetWidth)
            if (!gap || gap === 0) gap = 0
          }
          width = sumWidths + gap * (items.length - 1)
        }
      }
      // only update if changed
      if (width !== singleWidth) setSingleWidth(width)
    }
    // measure after layout with a RAF to ensure children are mounted
    const raf = requestAnimationFrame(measure)
    // measure again shortly after (for font/image loads that can affect width)
    const timeout = setTimeout(measure, 120)
    window.addEventListener('resize', measure)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timeout)
      window.removeEventListener('resize', measure)
    }
  }, [items, duplicates, singleWidth])

  const repeated = React.useMemo(() => {
    const arr: T[] = []
    for (let i = 0; i < duplicates; i++) arr.push(...items)
    return arr
  }, [items, duplicates])

  const animation = React.useMemo(() => {
    if (!singleWidth || prefersReducedMotion) return undefined
    return direction === 'left' ? { x: [0, -singleWidth] } : { x: [-singleWidth, 0] }
  }, [singleWidth, prefersReducedMotion, direction])

  const duration = singleWidth ? Math.max(15, singleWidth / speed) : 30

  const render = (it: T, idx: number) => {
    if (renderItem) return renderItem(it, idx)
    return (
      <div key={`${String(it)}-${idx}`} className="flex-shrink-0 px-8 py-4 rounded-xl bg-purple-500/5 border border-purple-500/10 backdrop-blur-sm hover:bg-purple-500/10 transition-all duration-300">
        <span className="text-xl font-semibold text-gray-400 whitespace-nowrap">{String(it)}</span>
      </div>
    )
  }

  React.useEffect(() => {
    // start/stop controls for animation when singleWidth changes
    if (animation) controls.start(animation)
    else controls.stop()
    if (debug) console.debug('Marquee animation:', { singleWidth, duration, animation })
  }, [animation, controls])

  return (
    <div className={className}>
      <div className="flex overflow-hidden">
        <motion.div
          ref={trackRef}
          animate={controls}
          initial={direction === 'left' ? { x: 0 } : { x: -(singleWidth || 0) }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
          aria-hidden
          role="presentation"
          style={{ willChange: 'transform' }}
          className="flex gap-16 items-center flex-nowrap"
        >
          {repeated.map((it, idx) => (
            <React.Fragment key={`${String(it)}-${idx}`}>
              {render(it, idx)}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Marquee
