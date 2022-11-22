import React from 'react'

type TitleProps = {
  title: string
}

function Title({ title }: TitleProps) {
  return <h1 className="Title">{title}</h1>
}

export default Title
