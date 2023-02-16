import React, { useState } from 'react'
import CardModal from '../components/CardModal'
import '../styles/Card.css'

type CardProps = {
  image: ImageTypes
  likedImage: boolean
  alt?: string
  innerRef?: () => void
  likeAction?: () => void
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
        image={{
          url: src || 'media/error-image.jpg',
          hdurl: highDefSrc || src,
          copyright: copyright || 'NASA',
          date: date || 'No Date Provided',
          title: title || 'NASA',
          explanation: explanation || 'No description provided',
        }}
        likedImage={likedImage}
        open={modalStatus}
        likeAction={likeAction}
        onClose={() => setModalStatus(false)}
      />
    </>
  )
}

export default Card
