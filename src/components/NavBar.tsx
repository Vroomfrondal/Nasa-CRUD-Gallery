import React, { useContext, SetStateAction, Dispatch } from 'react'
import { activePageContext } from './App'
import '../styles/NavBar.css'
import useShutNavBar from '../hooks/useCloseNavBar'

type NavBarActions = {
  setActivePage: Dispatch<SetStateAction<'Home' | 'Favorites'>>
}

function NavBar({ setActivePage }: NavBarActions) {
  const activePage = useContext(activePageContext)
  const { isShowingLinks, setIsShowingLinks } = useShutNavBar(activePage)

  return (
    <>
      <button className="hamburger_container" onClick={() => (isShowingLinks ? setIsShowingLinks(false) : null)}>
        <div
          onClick={() => setIsShowingLinks((status) => !status)}
          className={`hamburger ${isShowingLinks ? 'hidden opacity-0' : 'block'}`}
        >
          <span className="line w-1"></span>
          <span className="line w-2"></span>
          <span className="line w-3"></span>
        </div>
      </button>

      <nav className={`nav_bar ${isShowingLinks ? 'active_nav_bar' : ''}`}>
        <a href="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
          <img className={`emblem ${isShowingLinks ? 'hidden' : 'block'}`} src="media/TopherEmblem.png" />
        </a>

        <button
          className={`close_container ${isShowingLinks ? 'contents' : 'hidden'}`}
          onClick={() => setIsShowingLinks((status) => !status)}
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
            <img className={`mobile_emblem ${isShowingLinks ? 'block' : 'hidden'}`} src="media/TopherEmblem.png" />
          </a>
        </div>
      </nav>
    </>
  )
}

export default NavBar
