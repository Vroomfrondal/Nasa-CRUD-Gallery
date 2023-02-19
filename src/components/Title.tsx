import React from 'react'
import '../styles/Title.css'

type Title = {
  title: string
}

function Title({ title }: Title) {
  return <h1 className="Title">{title}</h1>
}

export default Title
