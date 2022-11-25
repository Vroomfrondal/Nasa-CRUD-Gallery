import React, { useState, useEffect, useRef, useCallback } from 'react'
import useFetchImages from '../../hooks/useFetchImages'
import ScrollToTopButton from '../ScrollToTopButton'
import Title from '../Title'
import Loading from '../Loading'
import Card from '../Card'

function HomePage() {
  const [likedImages, setLikedImages] = useState<ImageTypes[]>(
    JSON.parse(localStorage.getItem('nasa-liked-images') || '[]')
  )
  const [needMoreImages, setNeedMoreImages] = useState(true)
  const { images, isLoading } = useFetchImages(needMoreImages)

  // Observing Last Element on Page to create infinite scroll
  const observer: React.MutableRefObject<any> = useRef()
  const lastImageElementRef = useCallback(
    (element: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setNeedMoreImages(true)
      })

      if (element) observer.current.observe(element)
      setNeedMoreImages(false)
    },
    [!isLoading]
  )

  // Updating db after liking/unliking an image
  useEffect(() => {
    localStorage.setItem('nasa-liked-images', JSON.stringify(likedImages))
  }, [likedImages])

  return (
    <>
      <Title title="Beyond Our Earth" />

      <section className="container">
        {images.map((image: ImageTypes, index: number) => {
          if (images.length === index + 3) {
            return (
              <Card
                key={index}
                innerRef={lastImageElementRef}
                alt={image['url'] ? image['title'] : 'Image could not load'}
                media_type={image['media_type']}
                title={image['title'] ? image['title'] : 'No Title Provided'}
                date={image.date ? image.date : 'No Date Provided'}
                src={image['url'] ? image['url'] : 'media/error-image.jpg'}
                highDefSrc={image['hdurl'] ? image['hdurl'] : image['url']}
                explanation={image['explanation'] ? image['explanation'] : 'No description provided'}
                copyright={image['copyright'] ? image['copyright'] : 'NASA'}
                likedImage={likedImages.some((item) => item.date === image.date)}
                likeAction={() => {
                  const duplicateLike = likedImages.some((item) => item.date === image.date)

                  // Unlike if liked
                  if (duplicateLike) setLikedImages((images) => [...images.filter((item) => item.date !== image.date)])
                  else setLikedImages((images) => [...images, image])
                }}
              />
            )
          }

          return (
            <Card
              key={index}
              alt={image['url'] ? image['title'] : 'Error-placeholder'}
              media_type={image['media_type']}
              title={image['title'] ? image['title'] : 'Nasa'}
              date={image.date ? image.date : 'No date provided'}
              src={image['url'] ? image['url'] : 'media/error-image.jpg'}
              highDefSrc={image['hdurl'] ? image['hdurl'] : image['url']}
              explanation={image['explanation'] ? image['explanation'] : 'No description provided'}
              copyright={image['copyright'] ? image['copyright'] : 'NASA'}
              likedImage={likedImages.some((item) => item.date === image.date)}
              likeAction={() => {
                const duplicateLike = likedImages.some((item) => item.date === image.date)

                // Unlike if liked
                if (duplicateLike) setLikedImages((images) => [...images.filter((item) => item.date !== image.date)])
                else setLikedImages((images) => [...images, image])
              }}
            />
          )
        })}
      </section>

      <ScrollToTopButton />
      {isLoading ? <Loading /> : null}
    </>
  )
}

export default HomePage
