import React, { useState, useEffect } from 'react'
import tw, { styled } from 'twin.macro'

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Closing nav bar on user scroll
  useEffect(() => {
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  })

  const toggleVisible = () => {
    const scrolledValue = document.documentElement.scrollTop
    if (scrolledValue > 150) setIsVisible(true)
    else if (scrolledValue <= 0) setIsVisible(false)
  }

  return (
    <>
      <StyledButton isVisible={isVisible} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
        ^
      </StyledButton>
    </>
  )
}

export default ScrollToTopButton

type StyledButton = {
  isVisible: boolean
}

const StyledButton = styled.button<StyledButton>(({ isVisible }) => [
  tw`fixed flex justify-center items-center border border-cream rounded-[1000px] duration-300  bottom-4 right-2 z-10 text-cream bg-transparent sm:(p-[0.35rem]) md:(p-2) hover:(border border-blue-300)`,
  isVisible ? tw`flex` : tw`hidden`,
])
