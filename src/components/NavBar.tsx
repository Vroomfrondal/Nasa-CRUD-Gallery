import React, { useState, useEffect, useContext, SetStateAction, Dispatch } from 'react'
import { activePageContext } from './App'
import '../styles/NavBar.css'

type NavBarPropTypes = {
  setActivePage: Dispatch<SetStateAction<'Home' | 'Favorites'>>
}

function NavBar({ setActivePage }: NavBarPropTypes) {
  const [showNavLinks, setShowNavLinks] = useState(false)
  const activePage = useContext(activePageContext)

  // close nav menu on item-click or scroll
  useEffect(() => {
    window.addEventListener('scroll', () => setShowNavLinks(false))
    setShowNavLinks(false)
  }, [activePage])

  return (
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

      <nav className={`nav_bar ${showNavLinks ? 'active_nav_bar' : ''}`}>
        <a href="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
          <img className={`emblem ${showNavLinks ? 'hidden' : 'block'}`} src="media/TopherEmblem.png" />
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
              href="https://github.com/Vroomfrondal/Nasa-CRUD-Gallery"
              target="_blank"
              rel="noreferrer"
              className="source"
            >
              Source
            </a>
          </button>

          <a href="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
            <img className={`mobile_emblem ${showNavLinks ? 'block' : 'hidden'}`} src="media/TopherEmblem.png" />
          </a>
        </div>
      </nav>
    </>
  )
}

export default NavBar
