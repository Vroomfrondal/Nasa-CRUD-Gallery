import React from 'react'
import tw from 'twin.macro'

function Loading() {
  return <StyledLoader>Loading... &nbsp;</StyledLoader>
}

export default Loading

const StyledLoader = tw.h1`flex justify-center items-center text-2xl font-light pt-2`
