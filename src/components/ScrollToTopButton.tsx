import React, { useState, useEffect } from 'react'
import '../styles/ScrollToTopButton.css'

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  })

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 150) setVisible(true)
    else if (scrolled <= 0) setVisible(false)
  }

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
      className="ScrollToTop"
      hidden={visible ? false : true}
    >
      ^
    </button>
  )
}

export default ScrollToTopButton
