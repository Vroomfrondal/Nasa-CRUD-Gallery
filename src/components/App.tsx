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
      <div className="mask-gradient-banner absolute bg-[url('../media/earth-background.jpg')] bg-bottom bg-cover top-0 left-0 right-0 h-44 w-auto" />

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
