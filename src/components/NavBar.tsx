import React, { useState, useEffect } from 'react'

function useNavBar() {
  const [activePage, setActivePage] = useState('Home')
  const [showNavLinks, setShowNavLinks] = useState(false)

  // close nav menu on item-click
  useEffect(() => {
    window.addEventListener('scroll', () => setShowNavLinks(false))
    setShowNavLinks(false)
  }, [activePage])

  return {
    activePage,
    navBar: (
      <>
        <button className="hamburger_container" onClick={() => (showNavLinks ? setShowNavLinks(false) : null)}>
          <div
            onClick={() => setShowNavLinks((status) => !status)}
            className={`hamburger ${showNavLinks ? 'hidden opacity-0' : 'block'}`}
          >
            <span className="line w-1"></span>
            <span className="line w-2"></span>
            <span className="line w-3"></span>
          </div>
        </button>

        <nav className={`nav_bar ${showNavLinks ? 'active_nav_bar' : null}`}>
          <a href="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
            <span className={`emblem ${showNavLinks ? 'hidden' : 'block'}`}>T</span>
          </a>

          <button
            className={`close_container ${showNavLinks ? 'contents' : 'hidden'}`}
            onClick={() => setShowNavLinks((status) => !status)}
          >
            <span className="close_nav_button">X</span>
          </button>

          <div className="links">
            <button className="home" onClick={() => setActivePage('Home')}>
              Home
            </button>

            <button className="favorites" onClick={() => setActivePage('Favorites')}>
              Favorites
            </button>

            <button>
              <a
                href="https://github.com/Vroomfrondal/Photo-Gallery-React-Tailwind"
                target="_blank"
                rel="noreferrer"
                className="source"
              >
                Source
              </a>
            </button>

            <a href="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
              <span className={`mobile_emblem ${showNavLinks ? 'block' : 'hidden'}`}>T</span>
            </a>
          </div>
        </nav>
      </>
    ),
  }
}

export default useNavBar
