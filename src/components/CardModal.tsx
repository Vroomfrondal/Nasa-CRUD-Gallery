import React, { useContext, MouseEventHandler } from 'react'
import { activePageContext } from './App'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import tw from 'twin.macro'

type CardModalData = {
  image: Image
  isLikedImage: boolean
  isOpen: boolean
  onClose: MouseEventHandler<HTMLElement>
  onLike?: () => void
}

function CardModal({ image, isLikedImage, isOpen, onLike, onClose }: CardModalData) {
  const { language } = useContext(activePageContext)
  const { t } = useTranslation()

  if (!isOpen) return null

  const { date, title, copyright, explanation, hdurl: highDefSrc, url: src } = image
  const month = t(new Date(date!).toDateString().split(' ')[1] + ' ')
  const day = t(new Date(date!).toDateString().split(' ')[2])
  const year = t(new Date(date!).toDateString().split(' ')[3])

  return (
    <>
      <BlackoutContainer onClick={onClose} />

      <ModalContainer>
        <ModalContent>
          <CloseModalButton onClick={onClose} data-testid="close-modal">
            X
          </CloseModalButton>

          <ImageContainer>
            <Link to={highDefSrc || ''} target="_blank" rel="noreferrer">
              <ModalImage src={src} />
            </Link>

            <Title>{title}</Title>
            <Author>{copyright}</Author>

            <LikeButton onClick={onLike} data-testid="like-button">
              {isLikedImage ? <AiFillHeart color="red" size={23} /> : <AiOutlineHeart color="white" size={23} />}
            </LikeButton>
          </ImageContainer>

          <BodyContainer>
            {language === 'en' ? (
              <DateEl>
                <span>{month}</span>
                <span>{day}, </span>
                <span>{year}</span>
              </DateEl>
            ) : (
              <DateEl>
                <span>{`${day} de `}</span>
                <span>{`${month} de `}</span>
                <span>{year}</span>
              </DateEl>
            )}

            <Salutations>{t('A message from the astronomer,')}</Salutations>

            <Explanation>{explanation}</Explanation>
          </BodyContainer>
        </ModalContent>
      </ModalContainer>
    </>
  )
}

export default CardModal

// Modal Containers
const BlackoutContainer = tw.div`fixed inset-0 z-20 bg-modal_blackout`

const ModalContainer = tw.div`fixed z-30 h-[30rem] bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-navy_blue border border-cream max-w-[56rem] rounded-md w-[83.333333%] overflow-hidden`

const ModalContent = tw.div`h-full flex flex-col`

const ImageContainer = tw.div`relative h-36 grow hover:(overflow-hidden) `

// Modal Elements
const CloseModalButton = tw.span`absolute z-10 right-3 font-[500] text-lg cursor-pointer`

const BodyContainer = tw.div`flex flex-col grow justify-start pt-4 border-t indent-5`

// Image Container Elements
const ModalImage = tw.img`h-full opacity-70 rounded-bl-md rounded-br-md transition-all ease-in-out duration-700 border-none hover:(transform scale-110)`

const Title = tw.span`absolute top-[8.5rem] bottom-0 left-0 right-0 w-full font-normal text-lg text-center flex justify-center items-center md:(text-xl)`

const Author = tw.span`absolute top-1 left-1 text-xs opacity-70`

const LikeButton = tw.span`absolute m-2 right-0 bottom-1 cursor-pointer font-[500] h-[1.3rem] w-[1.3rem] border-none hover:(opacity-75)`

// Body Container Elements
const CardPreText = tw.span`text-left text-lg`
const DateEl = tw(CardPreText)``
const Salutations = tw(CardPreText)`pb-1`

const Explanation = tw.p`m-5 h-40 grow overflow-auto text-justify pr-2 indent-5 leading-[1.75rem]`
