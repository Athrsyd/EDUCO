import { useEffect, useState } from 'react'

const PageTransition = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true)
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <div
      className={`page-transition ${isVisible ? 'page-enter-active' : 'page-enter'} ${className}`}
    >
      {children}
    </div>
  )
}

export default PageTransition
