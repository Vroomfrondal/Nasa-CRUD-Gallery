import React, { useState, useEffect } from 'react'
// import '../styles/ScrollToTopButton.css'

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
      className={`fixed flex justify-center items-center border border-cream rounded-[1000px] duration-300 bottom-[1rem] right-2 z-10 text-cream bg-transparent hover:border hover:border-blue-300 sm:p-[0.35rem] md:p-2 ${
        !isVisible ? 'hidden' : 'flex'
      }`}
    >
      ^
    </button>
  )
}

export default ScrollToTopButton
