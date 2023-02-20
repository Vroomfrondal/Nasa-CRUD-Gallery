import React, { useState, useEffect } from 'react'
import { Image } from '../../typings'
import ScrollToTopButton from '../ScrollToTopButton'
import Card from '../Card'
import Title from '../Title'
import '../../styles/Favorites.css'

function Favorites() {
  const [likedImages, setLikedImages] = useState<Image[]>(JSON.parse(localStorage.getItem('nasa-liked-images') || '[]'))

  // Updating db after liking/unliking an image
  useEffect(() => {
    localStorage.setItem('nasa-liked-images', JSON.stringify(likedImages))
  }, [likedImages])

  return (
    <>
      <Title title="Liked Media" />

      {likedImages.length ? (
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
      ) : (
        <div className="no_likes_message">
          <span>Browse the </span>
          <a href="/">home page</a>
          <span> and like some images first!</span>
        </div>
      )}

      <ScrollToTopButton />
    </>
  )
}

export default Favorites
