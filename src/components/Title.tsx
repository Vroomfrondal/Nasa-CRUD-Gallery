import React from 'react'
import tw from 'twin.macro'

type Title = { title: string }

function Title({ title }: Title) {
  return <TitleHeader>{title}</TitleHeader>
}

const TitleHeader = tw.h1`flex justify-center text-4xl pt-32 pb-5 font-light animate-slideInLeft`

export default Title
