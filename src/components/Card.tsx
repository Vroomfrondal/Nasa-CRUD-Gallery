import React, { useState } from 'react'
import CardModal from '../components/CardModal'

type CardProps = {
  alt?: string
  media_type?: string
  title?: string
  date?: string
  src: string
  highDefSrc?: string
  explanation?: string
  copyright: string
  innerRef?: (node: HTMLDivElement) => void
  likeAction?: () => void
}

function Card({
  alt,
  media_type,
  title,
  date,
  src,
  highDefSrc,
  explanation,
  copyright,
  innerRef,
  likeAction,
}: CardProps) {
  const [modalStatus, setModalStatus] = useState(false)

  const dayInLetters = date ? `${new Date(date).toDateString().slice(0, 3)},` : 'No Date'
  const dayInNumbersAndYear = date ? new Date(date).toDateString().slice(7) : 'No Date'
  let media = <img src={src} alt={alt} onClick={() => setModalStatus(true)}></img>

  if (media_type === 'video')
    media = <iframe src={src} title={title ? title : alt} onClick={() => setModalStatus(true)}></iframe>

  return (
    <>
      <div ref={innerRef} className="card">
        {media}
        <section className="card_body">
          <span className="date bottom-8">{dayInLetters}</span>
          <span className="date bottom-0">{dayInNumbersAndYear}</span>
          <span className="like_button" onClick={likeAction}>
            <img className="noborder" src="media/heart-icon.png"></img>
          </span>
        </section>
      </div>

      <CardModal
        src={src}
        highDefSrc={highDefSrc}
        copyright={copyright}
        date={date}
        title={title ? title : 'No Title Provided'}
        explanation={explanation}
        open={modalStatus}
        likeAction={likeAction}
        onClose={() => setModalStatus(false)}
      />
    </>
  )
}

export default Card
