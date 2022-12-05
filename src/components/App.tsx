import React from 'react'
import useNavBar from './NavBar'
import HomePage from '../components/Pages/HomePage'
import Favorites from '../components/Pages/Favorites'
import { Route, Routes } from 'react-router-dom'

function App() {
  const navBar = useNavBar()

  return (
    <>
      <div className="banner"></div>
      {navBar}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}

export default App
