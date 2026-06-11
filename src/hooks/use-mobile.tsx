import * as React from "react"

const MOBILE_BREAKPOINT = 768

function isTouchCapable(): boolean {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  )
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const check = () =>
      window.innerWidth < MOBILE_BREAKPOINT || isTouchCapable()

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(check())
    mql.addEventListener("change", onChange)
    setIsMobile(check())
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
