import React, { useContext, SetStateAction, Dispatch } from 'react'
import { activePageContext } from './App'
import { Link } from 'react-router-dom'
import useIsNavBarOpenState from '../hooks/useIsNavBarOpenState'

type NavBarActions = {
  setActivePage: Dispatch<SetStateAction<'Home' | 'Favorites'>>
}

function NavBar({ setActivePage }: NavBarActions) {
  const activePage = useContext(activePageContext)
  const [isShowingLinks, setIsShowingLinks] = useIsNavBarOpenState(activePage)

  return (
    <>
      <button
        className="fixed flex flex-col justify-center items-center top-0 w-full font-semibold bg-transparent border-0"
        onClick={() => (isShowingLinks ? setIsShowingLinks(false) : null)}
      >
        <div
          onClick={() => setIsShowingLinks((status) => !status)}
          className={`absolute right-0 top-0 p-2 cursor-pointer duration-500 transform rotate-180 hover:bg-hover_opaque md:opacity-0 md:hidden ${
            isShowingLinks ? 'hidden opacity-0' : 'block'
          }`}
        >
          <span className="block h-1 m-1 rounded-md bg-cream w-4"></span>
          <span className="block h-1 m-1 rounded-md bg-cream w-5"></span>
          <span className="block h-1 m-1 rounded-md bg-cream w-6"></span>
        </div>
      </button>

      <nav
        className={`top-0 h-full animate-slideInNav duration-150 text-cream font-semibold fixed w-48  md:absolute md:flex md:justify-between md:w-full ${
          isShowingLinks
            ? 'right-0 top-0 bg-navy_blue z-50 fixed flex flex-col md:absolute md:flex md:justify-between md:w-full md:animate-slideInNav md:duration-1000 lg:absolute lg:flex-row lg:h-fit lg:left-0 lg:right-0 lg:bg-transparent lg:z-50'
            : 'hidden'
        }`}
      >
        <Link to="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
          <img
            className={`h-7 w-7 pl-1 pt-1 border-none ${isShowingLinks ? 'hidden' : 'block'}`}
            src="media/TopherEmblem.png"
          />
        </Link>

        <button
          className={`flex justify-center items-center p-2 cursor-pointer duration-500 h-8 hover:bg-hover_opaque md:opacity-0 md:hidden ${
            isShowingLinks ? 'contents' : 'hidden'
          }`}
          onClick={() => setIsShowingLinks((status) => !status)}
        >
          <span className="font-bold text-lg py-2 text-center rounded-sm w-full">X</span>
        </button>

        <div className="flex h-fit sm:flex-col sm:border-t sm:border-cream md:flex-row md:border-none">
          <Link to="/" onClick={() => setActivePage('Home')}>
            <button className="w-full md:w-32 font-[500] text-base">Home</button>
          </Link>

          <Link to="/Favorites" onClick={() => setActivePage('Favorites')} className="favorites">
            <button className="w-full md:w-32 font-[500] text-base">Favorites</button>
          </Link>

          <Link
            to="https://github.com/Vroomfrondal/Nasa-CRUD-Gallery"
            target="_blank"
            rel="noreferrer"
            className="text-center"
          >
            <button className="w-full md:w-32 font-[500] text-base">Source</button>
          </Link>

          <Link to="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
            <img
              className={`absolute w-6 h-6 border-none sm:bottom-2 sm:right-2 md:top-0 md:left-0 ${
                isShowingLinks ? 'block' : 'hidden'
              }`}
              src="media/TopherEmblem.png"
            />
          </Link>
        </div>
      </nav>
    </>
  )
}

export default NavBar
