import React from 'react'
import useNavBar from './NavBar'
import HomePage from '../components/Pages/HomePage'
import Favorites from '../components/Pages/Favorites'

function App() {
  const { navBar, activePage } = useNavBar()

  return (
    <>
      <div className="banner"></div>

      {navBar}
      {activePage === 'Home' ? <HomePage /> : null}
      {activePage === 'Favorites' ? <Favorites /> : null}
    </>
  )
}

export default App
