import React, { MouseEventHandler } from 'react'
import '../styles/CardModal.css'

type CardModalTypes = {
  image: ImageTypes
  likedImage: boolean
  open: boolean
  likeAction?: () => void
  onClose: MouseEventHandler<HTMLElement>
}

function CardModal({ image, likedImage, open, likeAction, onClose }: CardModalTypes) {
  if (!open) return null

  const { date, title, copyright, explanation, hdurl: highDefSrc, url: src } = image

  return (
    <>
      <div onClick={onClose} className="blackout_container"></div>

      <div className="modal_container">
        <div className="cm_content">
          <span onClick={onClose} className="close_modal_button">
            X
          </span>

          <div className="cm_image_container">
            <a href={highDefSrc} target="_blank" rel="noreferrer">
              <img src={src} className="cm_img" />
            </a>
            <span className="cm_title">{title}</span>
            <span className="cm_author">{copyright}</span>
            <span className="like_button" onClick={likeAction}>
              <img
                className="noborder"
                src={`${likedImage ? 'media/liked-heart-icon.png' : 'media/unliked-heart-icon.png'}`}
              ></img>
            </span>
          </div>

          <div className="cm_body">
            <span className="cm_date">{new Date(date!).toDateString().slice(4)}</span>

            <span className="cm_salutations">A message from the astronomer,</span>
            <p className="cm_explanation">{explanation}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardModal
