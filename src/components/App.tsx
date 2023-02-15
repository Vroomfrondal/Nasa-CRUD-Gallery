import React, { useState, createContext } from 'react'
import NavBar from './NavBar'
import HomePage from '../components/Pages/HomePage'
import Favorites from '../components/Pages/Favorites'

export const activePageContext = createContext<'Home' | 'Favorites'>('Home')

function App() {
  const [activePage, setActivePage] = useState<'Home' | 'Favorites'>('Home')

  return (
    <>
      <div className="banner" />

      <activePageContext.Provider value={activePage}>
        <NavBar setActivePage={setActivePage} />
      </activePageContext.Provider>

      {activePage === 'Home' ? <HomePage /> : null}
      {activePage === 'Favorites' ? <Favorites /> : null}
    </>
  )
}

export default App
