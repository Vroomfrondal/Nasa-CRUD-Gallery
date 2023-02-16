import React, { useState } from 'react'
import CardModal from '../components/CardModal'
import '../styles/Card.css'

type CardProps = {
  alt?: string
  likedImage: boolean
  innerRef?: () => void
  likeAction?: () => void
  image: ImageTypes
}

function Card({ alt = '', image, likedImage, innerRef, likeAction }: CardProps) {
  const [modalStatus, setModalStatus] = useState(false)

  const { date, title, media_type, copyright, explanation, hdurl: highDefSrc, url: src } = image

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
        src={src!} // ! remove null
        highDefSrc={highDefSrc}
        copyright={copyright!} // ! remove null
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
