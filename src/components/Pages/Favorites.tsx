import React, { useState, useEffect } from 'react'
import ScrollToTopButton from '../ScrollToTopButton'
import Card from '../Card'
import Title from '../Title'

function Favorites() {
  const [likedImages, setLikedImages] = useState<ImageTypes[]>(
    JSON.parse(localStorage.getItem('nasa-liked-images') || '[]')
  )

  // Retrieving from Local Storage on load
  useEffect(() => {
    setLikedImages(JSON.parse(localStorage.getItem('nasa-liked-images') || '[]'))
  }, [])

  // Removing from local storage
  useEffect(() => {
    localStorage.setItem('nasa-liked-images', JSON.stringify(likedImages))
  }, [likedImages])

  return (
    <>
      <Title title="Liked Media" />

      {likedImages.length ? (
        <section className="container">
          {likedImages.map((image: ImageTypes, index: number) => {
            return (
              <Card
                key={index}
                alt={image['url'] ? image['title'] : 'Error-placeholder'}
                media_type={image['media_type']}
                title={image['title'] ? image['title'] : 'Nasa'}
                date={image.date ? image.date : 'No Date Provided'}
                src={image['url'] ? image['url'] : 'media/error-image.jpg'}
                highDefSrc={image['hdurl'] ? image['hdurl'] : image['url']}
                explanation={image['explanation'] ? image['explanation'] : 'No description provided'}
                copyright={image['copyright'] ? image['copyright'] : 'NASA'}
                likeAction={() => {
                  setLikedImages((images) => [...images.filter((item) => item.date !== image.date)])
                }}
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
