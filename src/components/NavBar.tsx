import React, { useContext, SetStateAction, Dispatch } from 'react'
import { activePageContext } from './App'
import { Link } from 'react-router-dom'
import useIsNavBarOpenState from '../hooks/useIsNavBarOpenState'
import '../styles/NavBar.css'

type NavBarActions = {
  setActivePage: Dispatch<SetStateAction<'Home' | 'Favorites'>>
}

function NavBar({ setActivePage }: NavBarActions) {
  const activePage = useContext(activePageContext)
  const [isShowingLinks, setIsShowingLinks] = useIsNavBarOpenState(activePage)

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
        <Link to="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
          <img className={`emblem ${isShowingLinks ? 'hidden' : 'block'}`} src="media/TopherEmblem.png" />
        </Link>

        <button
          className={`close_container ${isShowingLinks ? 'contents' : 'hidden'}`}
          onClick={() => setIsShowingLinks((status) => !status)}
        >
          <span className="close_nav_button">X</span>
        </button>

        <div className="links">
          <Link to="/" onClick={() => setActivePage('Home')}>
            <button className="redirect_button">Home</button>
          </Link>

          <Link to="/Favorites" onClick={() => setActivePage('Favorites')} className="favorites">
            <button className="redirect_button">Favorites</button>
          </Link>

          <Link
            to="https://github.com/Vroomfrondal/Nasa-CRUD-Gallery"
            target="_blank"
            rel="noreferrer"
            className="source"
          >
            <button className="redirect_button">Source</button>
          </Link>

          <Link to="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
            <img className={`mobile_emblem ${isShowingLinks ? 'block' : 'hidden'}`} src="media/TopherEmblem.png" />
          </Link>
        </div>
      </nav>
    </>
  )
}

export default NavBar
