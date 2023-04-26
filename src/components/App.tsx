import React, { useState, createContext } from 'react'
import NavBar from './NavBar'
import HomePage from '../components/Pages/HomePage'
import Favorites from '../components/Pages/Favorites'
import { Route, Routes } from 'react-router-dom'

export const activePageContext = createContext<'Home' | 'Favorites'>('Home')

function App() {
  const [activePage, setActivePage] = useState<'Home' | 'Favorites'>('Home')

  return (
    <>
      <div className="banner" />

      <activePageContext.Provider value={activePage}>
        <NavBar setActivePage={setActivePage} />
      </activePageContext.Provider>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Favorites" element={<Favorites />}></Route>
      </Routes>
    </>
  )
}

export default App
