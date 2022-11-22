import React from 'react'
import '../styles/index.css'

type TitleProps = {
  title: string
}

function Title({ title }: TitleProps) {
  return <h1 className="Title">{title}</h1>
}

export default Title