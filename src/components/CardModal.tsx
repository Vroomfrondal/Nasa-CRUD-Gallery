import React, { MouseEventHandler } from 'react'

type CardModalTypes = {
  src: any
  highDefSrc?: string
  title: string
  explanation?: string
  copyright: string
  date?: string
  open: boolean
  likeAction?: () => void
  onClose: MouseEventHandler<HTMLElement>
}

function CardModal({
  src,
  highDefSrc,
  title,
  explanation,
  copyright,
  date,
  open,
  likeAction,
  onClose,
}: CardModalTypes) {
  if (!open) return null

  return (
    <>
      <div onClick={onClose} className="blackout_container"></div>

      <div className="modal_container">
        <div className="card_content">
          <span onClick={onClose} className="close_modal_button">
            X
          </span>

          <div className="card_image">
            <a href={highDefSrc} target="_blank" rel="noreferrer">
              <img src={src} className="card_image img" />
            </a>
            <span className="card_title">{title}</span>
            <span className="card_author">{copyright}</span>
            <span className="like_button" onClick={likeAction}>
              {'<3'}
            </span>
          </div>

          <div className="card-body">
            <span className="card-date">{new Date(date!).toDateString().slice(4)}</span>

            <span className="card-salutations">A message from the astronomer,</span>
            <p className="card-explanation">{explanation}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardModal
