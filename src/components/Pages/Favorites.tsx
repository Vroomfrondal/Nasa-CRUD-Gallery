import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import tw from 'twin.macro'
import ScrollToTopButton from '../ScrollToTopButton'
import Card from '../Card'
import Title from '../Title'
import { useTranslation } from 'react-i18next'

function Favorites() {
  const [likedImages, setLikedImages] = useState<Image[]>(
    JSON.parse(localStorage.getItem('nasa-liked-images') || '[]').reverse() // Reverse so last image liked shows as most recent
  )

  // Updating db after liking/unliking an image
  useEffect(() => {
    localStorage.setItem('nasa-liked-images', JSON.stringify(likedImages))
  }, [likedImages])

  const { t } = useTranslation()

  return (
    <>
      <Title title={t('Liked Media')} />

      {likedImages.length ? (
        <>
          <section className="container">
            {likedImages.map((image, index) => {
              const { media_type, title, date, url: src, hdurl: highDefSrc, explanation, copyright } = image

              return (
                <Card
                  key={src || index}
                  image={{
                    media_type: media_type,
                    title: title,
                    date: date,
                    url: src,
                    hdurl: highDefSrc,
                    explanation: explanation,
                    copyright: copyright,
                  }}
                  alt={src ? title : 'Error-placeholder'}
                  isLikedImage={likedImages.some((item) => item.date === date)}
                  onLike={() => setLikedImages((images) => images.filter((item) => item.date !== date))}
                />
              )
            })}
          </section>

          <FooterMessage>{t('End of History')}</FooterMessage>
        </>
      ) : (
        <EmptyFavoritesMessage>
          <span>{t('Browse the ')}</span>
          <Link to="/" className="relative text-light_blue hover:text-normal_blue">
            {t('home page')}
          </Link>
          <span>{t(' and like some images first!')}</span>
        </EmptyFavoritesMessage>
      )}

      <ScrollToTopButton />
    </>
  )
}

export default Favorites

const FooterMessage = tw.h1`text-sm text-gray-500 flex justify-center pt-10`
const EmptyFavoritesMessage = tw.div`text-center`
