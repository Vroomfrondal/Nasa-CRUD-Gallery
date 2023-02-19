import React, { useState, useEffect, useRef, useCallback } from 'react'
import { ImageTypes } from '../../typings'
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

  const generateCard = (image: ImageTypes, index: number, ref?: any) => {
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
        innerRef={ref}
        alt={src ? title : 'Image could not load'}
        isLikedImage={likedImages.some((item) => item.date === date)}
        onLike={() => {
          const duplicateLike = likedImages.some((item) => item.date === date)

          // Unlike if liked
          if (duplicateLike) setLikedImages((images) => images.filter((item) => item.date !== date))
          else setLikedImages((images) => [...images, image])
        }}
      />
    )
  }

  return (
    <>
      <Title title="Beyond Our Earth" />

      <section className="container">
        {images.map((image, index) => {
          if (images.length === index + 3) return generateCard(image, index, lastImageElementRef)

          return generateCard(image, index)
        })}
      </section>

      <ScrollToTopButton />
      {isLoading ? <Loading /> : null}
    </>
  )
}

export default HomePage
