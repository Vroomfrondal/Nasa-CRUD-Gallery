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
            const { date, title, media_type, copyright, explanation, hdurl: highDefSrc, url: src } = image

            return (
              <Card
                key={index}
                alt={image.url ? image.title : 'Error-placeholder'}
                image={{
                  media_type: media_type,
                  title: title ? title : 'NASA',
                  date: date ? date : 'No Date Provided',
                  url: src ? src : 'media/error-image.jpg',
                  hdurl: highDefSrc ? highDefSrc : src,
                  explanation: explanation ? explanation : 'No description provided',
                  copyright: copyright ? copyright : 'Nasa',
                }}
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
