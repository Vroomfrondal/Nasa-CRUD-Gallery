import React, { useState, useEffect } from 'react'
import '../styles/ScrollToTopButton.css'

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Closing nav bar if user scrolls
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  })

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 150) setIsVisible(true)
    else if (scrolled <= 0) setIsVisible(false)
  }

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      className="ScrollToTop"
      hidden={isVisible ? false : true}
    >
      ^
    </button>
  )
}

export default ScrollToTopButton
