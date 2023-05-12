import React, { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'

type CardModalData = {
  image: Image
  isLikedImage: boolean
  isOpen: boolean
  onClose: MouseEventHandler<HTMLElement>
  onLike?: () => void
}

function CardModal({ image, isLikedImage, isOpen, onLike, onClose }: CardModalData) {
  if (!isOpen) return null

  const { date, title, copyright, explanation, hdurl: highDefSrc, url: src } = image

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-20 bg-modal_blackout" />

      <div className="fixed z-30 h-auto bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-navy_blue border border-cream max-w-[56rem] rounded-md w-[83.333333%] overflow-hidden">
        <div className="h-full flex flex-col">
          <span onClick={onClose} className="absolute z-10 right-3 font-[500] text-lg cursor-pointer">
            X
          </span>

          <div className="relative h-36 flex-grow hover:overflow-hidden">
            <Link to={highDefSrc || ''} target="_blank" rel="noreferrer">
              <img
                src={src}
                className="h-full opacity-70 rounded-bl-md rounded-br-md transition-all ease-in-out duration-700 border-none hover:transform hover:scale-110"
              />
            </Link>
            <span className="absolute top-[6.5rem] bottom-0 left-0 right-0 w-full font-normal text-lg text-center flex justify-center items-center md:text-xl">
              {title}
            </span>
            <span className="absolute top-1 left-1 text-xs opacity-70">{copyright}</span>
            <span
              className="absolute m-2 right-0 bottom-1 cursor-pointer font-[500] h-[1.3rem] w-[1.3rem] border-none hover:opacity-75"
              onClick={onLike}
            >
              <img
                className="border-none"
                src={`${isLikedImage ? 'media/liked-heart-icon.png' : 'media/unliked-heart-icon.png'}`}
              />
            </span>
          </div>

          <div className="flex flex-col flex-grow justify-start pt-4 border-t indent-5">
            <span className="text-lg text-left">{new Date(date!).toDateString().slice(4)},</span>

            <span className="text-left pb-1 text-lg">A message from the astronomer,</span>
            <p className="m-5 h-40 flex-grow overflow-auto text-center indent-5 leading-[1.5rem]">{explanation}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardModal
