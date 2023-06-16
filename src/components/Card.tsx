import React, { useState, forwardRef } from 'react'
import CardModal from '../components/CardModal'
import tw from 'twin.macro'
import { useTranslation } from 'react-i18next'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type CardProps = {
  image: Image
  isLikedImage: boolean
  alt?: string
  onLike?: () => void
}

// Forward Ref hook to avoid naming ref property as "innerRef"
const Card = forwardRef(function Card(props: CardProps, ref: any) {
  const [modalStatus, setModalStatus] = useState(false)

  const { t } = useTranslation()

  const { alt = '', image, isLikedImage, onLike } = props
  const { date, title, media_type, copyright, explanation, hdurl: highDefSrc, url: src } = image
  const dayInLetters = date ? `${new Date(date).toDateString().slice(0, 3)},` : 'No Date'
  const dayInNumbersAndYear = date ? new Date(date).toDateString().slice(7) : 'No Date'

  return (
    <>
      <StyledCard ref={ref} className="card">
        {media_type === 'video' ? (
          <iframe src={src} title={title || alt} onClick={() => setModalStatus(true)} />
        ) : (
          <img src={src || 'media/error-image.jpg'} alt={alt} onClick={() => setModalStatus(true)} />
        )}

        <CardBody className="card_body">
          <DateTitle className="bottom-8">{t(`${dayInLetters}`)}</DateTitle>
          <DateTitle className="bottom-0">{dayInNumbersAndYear}</DateTitle>

          <LikeButton onClick={onLike}>
            {isLikedImage ? <AiFillHeart color="red" size={23} /> : <AiOutlineHeart color="white" size={23} />}
          </LikeButton>
        </CardBody>
      </StyledCard>

      <CardModal
        image={{
          url: src || 'media/error-image.jpg',
          hdurl: highDefSrc || src,
          copyright: copyright || 'NASA',
          date: date || 'No Date Provided',
          title: title || 'NASA',
          explanation: explanation || 'No description provided',
        }}
        isOpen={modalStatus}
        onLike={onLike}
        onClose={() => setModalStatus(false)}
      />
    </>
  )
})

export default Card

// Card Containers
const StyledCard = tw.div`relative flex justify-end bg-bg_black animate-onLoadAppear duration-300 hover:(z-10) md:hover:(transform scale-110) md:first:(col-span-2 row-span-1)`

// Card Elements
const CardBody = tw.section`hidden h-full w-full`

const DateTitle = tw.span`absolute left-0 m-2 text-4xl font-normal animate-dateBounce`

const LikeButton = tw.section`absolute cursor-pointer font-medium h-[1.3rem] w-[1.3rem] m-2 border-none right-0 bottom-1 hover:(opacity-75)`
