import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there is no hash, scroll to top
    if (!hash) {
      window.scrollTo(0, 0)
    } else {
      // If there is a hash, find the element and scroll to it
      const id = hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' })
          }, 100)
      }
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
