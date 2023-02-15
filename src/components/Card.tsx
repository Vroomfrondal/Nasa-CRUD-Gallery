import React, { useState } from 'react'
import CardModal from '../components/CardModal'
import '../styles/Card.css'

type CardProps = {
  alt?: string
  media_type?: string
  title?: string
  date?: string
  src: string
  highDefSrc?: string
  explanation?: string
  copyright: string
  likedImage: boolean
  innerRef?: (node: HTMLDivElement) => void
  likeAction?: () => void
}

function Card({
  alt = '',
  media_type,
  title = 'No Title Provided.',
  date,
  src,
  highDefSrc,
  explanation,
  copyright,
  likedImage,
  innerRef,
  likeAction,
}: CardProps) {
  const [modalStatus, setModalStatus] = useState(false)

  const dayInLetters = date ? `${new Date(date).toDateString().slice(0, 3)},` : 'No Date'
  const dayInNumbersAndYear = date ? new Date(date).toDateString().slice(7) : 'No Date'

  return (
    <>
      <div ref={innerRef} className="card">
        {media_type === 'video' ? (
          <iframe src={src} title={title || alt} onClick={() => setModalStatus(true)}></iframe>
        ) : (
          <img src={src} alt={alt} onClick={() => setModalStatus(true)}></img>
        )}

        <section className="card_body">
          <span className="date bottom-8">{dayInLetters}</span>
          <span className="date bottom-0">{dayInNumbersAndYear}</span>
          <span className="like_button" onClick={likeAction}>
            <img
              className="noborder"
              src={`${likedImage ? 'media/liked-heart-icon.png' : 'media/unliked-heart-icon.png'}`}
            ></img>
          </span>
        </section>
      </div>

      <CardModal
        src={src}
        highDefSrc={highDefSrc}
        copyright={copyright}
        likedImage={likedImage}
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
