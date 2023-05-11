import React, { useState, forwardRef } from 'react'
import CardModal from '../components/CardModal'
// import '../styles/Card.css'

type CardProps = {
  image: Image
  isLikedImage: boolean
  alt?: string
  onLike?: () => void
}

// Forward Ref hook to avoid naming ref property as "innerRef"
const Card = forwardRef(function Card(props: CardProps, ref: any) {
  const [modalStatus, setModalStatus] = useState(false)

  const { alt = '', image, isLikedImage, onLike } = props
  const { date, title, media_type, copyright, explanation, hdurl: highDefSrc, url: src } = image
  const dayInLetters = date ? `${new Date(date).toDateString().slice(0, 3)},` : 'No Date'
  const dayInNumbersAndYear = date ? new Date(date).toDateString().slice(7) : 'No Date'

  return (
    <>
      <div
        ref={ref}
        className="card relative flex justify-end bg-bg_black animate-onLoadAppear duration-300 hover:z-10 md:hover:transform md:hover:scale-110 md:first:col-span-2 md:first:row-span-1"
      >
        {media_type === 'video' ? (
          <iframe src={src} title={title || alt} onClick={() => setModalStatus(true)} />
        ) : (
          <img src={src || 'media/error-image.jpg'} alt={alt} onClick={() => setModalStatus(true)} />
        )}

        <section className="card_body hidden h-full w-full">
          <span className="date bottom-8">{dayInLetters}</span>
          <span className="date bottom-0">{dayInNumbersAndYear}</span>
          <span className="like_button" onClick={onLike}>
            <img
              className="border-none"
              src={`${isLikedImage ? 'media/liked-heart-icon.png' : 'media/unliked-heart-icon.png'}`}
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
        isLikedImage={isLikedImage}
        isOpen={modalStatus}
        onLike={onLike}
        onClose={() => setModalStatus(false)}
      />
    </>
  )
})

export default Card
