import { useState, useEffect } from 'react'

const useIsNavBarOpenState = (activePage: 'Home' | 'Favorites') => {
  const [isShowingLinks, setIsShowingLinks] = useState(false)

  // Close Nav Menu on Scroll
  useEffect(() => {
    window.addEventListener('scroll', () => setIsShowingLinks(false))
    return () => window.removeEventListener('scroll', () => setIsShowingLinks(false))
  }, [])

  // Close Nav Menu when switching pages
  useEffect(() => {
    setIsShowingLinks(false)
  }, [activePage])

  return [isShowingLinks, setIsShowingLinks] as [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

export default useIsNavBarOpenState
