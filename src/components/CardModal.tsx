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
        <div className="cm_content">
          <span onClick={onClose} className="close_modal_button">
            X
          </span>

          <div className="cm_image">
            <a href={highDefSrc} target="_blank" rel="noreferrer">
              <img src={src} className="cm_image img" />
            </a>
            <span className="cm_title">{title}</span>
            <span className="cm_author">{copyright}</span>
            <span className="like_button" onClick={likeAction}>
              {'<3'}
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