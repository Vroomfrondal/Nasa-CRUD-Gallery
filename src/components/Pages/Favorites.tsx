import React, { useState, useEffect } from 'react'
import ScrollToTopButton from '../ScrollToTopButton'
import Card from '../Card'
import Title from '../Title'
import '../../styles/Favorites.css'

function Favorites() {
  const [likedImages, setLikedImages] = useState<ImageTypes[]>(
    JSON.parse(localStorage.getItem('nasa-liked-images') || '[]')
  )

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
                key={index}
                image={{
                  media_type: media_type,
                  title: title || 'NASA',
                  date: date || 'No Date Provided',
                  url: src || 'media/error-image.jpg',
                  hdurl: highDefSrc || src,
                  explanation: explanation || 'No description provided',
                  copyright: copyright || 'Nasa',
                }}
                alt={image.url ? image.title : 'Error-placeholder'}
                likedImage={likedImages.some((item) => item.date === image.date)}
                likeAction={() => setLikedImages((images) => images.filter((item) => item.date !== image.date))}
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
