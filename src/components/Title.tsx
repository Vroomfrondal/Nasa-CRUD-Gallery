import React from 'react'
// import '../styles/index.css'
import '../styles/Title.css'

type TitleProps = {
  title: string
}

function Title({ title }: TitleProps) {
  return <h1 className="Title">{title}</h1>
}

export default Title
