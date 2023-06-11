import React, { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import HomePage from './Pages/HomePage'
import Favorites from './Pages/Favorites'
import Error from './Pages/Error'
import tw from 'twin.macro'
import '../locales/i18n'

export const activePageContext = createContext<'Home' | 'Favorites'>('Home')

function App() {
  const [activePage, setActivePage] = useState<'Home' | 'Favorites'>('Home')

  return (
    <>
      <BannerImage />

      <activePageContext.Provider value={activePage}>
        <NavBar setActivePage={setActivePage} />
      </activePageContext.Provider>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/Favorites" element={<Favorites />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </>
  )
}

export default App

const BannerImage = tw.div`mask-gradient-banner absolute bg-[url('../media/earth-background.jpg')] bg-bottom bg-cover top-0 left-0 right-0 h-44 w-auto`
