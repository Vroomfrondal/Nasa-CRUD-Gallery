import React, { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavBar from './NavBar'
import HomePage from './Pages/HomePage'
import Favorites from './Pages/Favorites'
import Error from './Pages/Error'
import Newsletter from './Pages/Newsletter'
import tw from 'twin.macro'
import '../../i18n'

export const activePageContext = createContext<{
  activePage: 'Home' | 'Favorites' | 'Newsletter'
  language: 'en' | 'es'
}>({
  activePage: 'Home',
  language: 'en',
})

function App() {
  const [activePage, setActivePage] = useState<'Home' | 'Favorites' | 'Newsletter'>('Home')
  const [language, setLanguage] = useState<'en' | 'es'>('en')

  return (
    <>
      <BannerImage />

      <activePageContext.Provider value={{ activePage: activePage, language: language }}>
        <NavBar setActivePage={setActivePage} setLanguage={setLanguage} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/Newsletter" element={<Newsletter />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </activePageContext.Provider>
    </>
  )
}

export default App

const BannerImage = tw.div`mask-gradient-banner absolute bg-[url('../media/earth-background.jpg')] bg-bottom bg-cover top-0 left-0 right-0 h-44 w-auto`
