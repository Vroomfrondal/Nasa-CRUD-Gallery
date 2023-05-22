import React from 'react'

type Title = {
  title: string
}

function Title({ title }: Title) {
  return <h1 className="flex justify-center text-4xl pt-32 pb-5 font-light animate-slideInLeft">{title}</h1>
}

export default Title
