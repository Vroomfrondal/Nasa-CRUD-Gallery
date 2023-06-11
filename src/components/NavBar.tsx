import React, { useContext, SetStateAction, Dispatch } from 'react'
import { activePageContext } from './App'
import { Link } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { changeLanguage } from 'i18next'
import useIsNavBarOpenState from '../hooks/useIsNavBarOpenState'
import { useTranslation } from 'react-i18next'

type NavBarActions = {
  setActivePage: Dispatch<SetStateAction<'Home' | 'Favorites'>>
}

function NavBar({ setActivePage }: NavBarActions) {
  const activePage = useContext(activePageContext)
  const [isShowingLinks, setIsShowingLinks] = useIsNavBarOpenState(activePage)

  const { t } = useTranslation()

  return (
    <>
      <HamburgerContainer onClick={() => (isShowingLinks ? setIsShowingLinks(false) : null)}>
        <Hamburger isShowingLinks={isShowingLinks} onClick={() => setIsShowingLinks((status) => !status)}>
          <TempHamburgerIcon className="w-4" />
          <TempHamburgerIcon className="w-5" />
          <TempHamburgerIcon className="w-6" />
        </Hamburger>
      </HamburgerContainer>

      <NavigationBar isShowingLinks={isShowingLinks}>
        <Link to="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
          <Emblem src="media/TopherEmblem.png" isShowingLinks={isShowingLinks} />
        </Link>

        <CloseContainer onClick={() => setIsShowingLinks((status) => !status)} isShowingLinks={isShowingLinks}>
          <TempXButton>X</TempXButton>
        </CloseContainer>

        <Links>
          <Link to="/" onClick={() => setActivePage('Home')}>
            <PageButton>{t('Home')}</PageButton>
          </Link>

          <Link to="/Favorites" onClick={() => setActivePage('Favorites')}>
            <PageButton>{t('Favorites')}</PageButton>
          </Link>

          <Link to="https://github.com/Vroomfrondal/Nasa-CRUD-Gallery" target="_blank" rel="noreferrer">
            <PageButton>{t('Source')}</PageButton>
          </Link>

          <Link to="https://www.topherdeleon.com/" target="_blank" rel="noreferrer">
            <MobileWebsiteEmblem src="media/TopherEmblem.png" isShowingLinks={isShowingLinks} />
          </Link>

          <PageButton
            onClick={() => {
              // changeLanguage(window.navigator.language === 'en-US' ? 'es' : 'en')
              changeLanguage('es')
            }}
          >
            {t('Language')}
          </PageButton>
        </Links>
      </NavigationBar>
    </>
  )
}

export default NavBar

// Containers
const NavigationBar = styled.nav<{ isShowingLinks: boolean }>(({ isShowingLinks }) => [
  tw`top-0 h-full animate-slideInNav duration-150 text-cream font-semibold fixed w-48 md:(absolute flex justify-between w-full)`,
  isShowingLinks
    ? tw`right-0 top-0 bg-navy_blue z-50 fixed flex flex-col md:(absolute flex justify-between w-full animate-slideInNav duration-1000) lg:(absolute flex-row h-fit left-0 right-0 bg-transparent z-50)`
    : tw`hidden`,
])

const CloseContainer = styled.button<{ isShowingLinks: boolean }>(({ isShowingLinks }) => [
  tw`flex justify-center items-center p-2 cursor-pointer duration-500 h-8 hover:(bg-hover_opaque) md:(opacity-0 hidden)`,
  isShowingLinks ? tw`contents` : tw`hidden`,
])

const HamburgerContainer = tw.button`fixed h-full flex flex-col justify-center items-center top-0 w-full font-semibold bg-transparent border-0` //
const Links = tw.div`flex h-fit sm:(flex-col border-t border-cream) md:(flex-row border-none)`

// Elements
const Hamburger = styled.div<{ isShowingLinks: boolean }>(({ isShowingLinks }) => [
  tw`absolute right-0 top-0 p-2 cursor-pointer duration-500 transform rotate-180 hover:(bg-hover_opaque) md:(hidden opacity-0)`,
  isShowingLinks ? tw`hidden opacity-0` : tw`block`,
])

const Emblem = styled.img<{ isShowingLinks: boolean }>(({ isShowingLinks }) => [
  tw`h-7 w-7 pl-1 pt-1 border-none`,
  isShowingLinks ? tw`hidden` : tw`block`,
])

const MobileWebsiteEmblem = styled.img<{ isShowingLinks: boolean }>(({ isShowingLinks }) => [
  tw`absolute w-6 h-6 border-none sm:(bottom-2 right-2) md:(top-0 left-0)`,
  isShowingLinks ? tw`block` : tw`hidden`,
])

const TempHamburgerIcon = tw.span`block h-1 m-1 rounded-md bg-cream`

const PageButton = tw.button`w-full font-[500] text-base md:(w-32)`

const TempXButton = tw.span`font-bold text-lg py-2 text-center rounded-sm`
