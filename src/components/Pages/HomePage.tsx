import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Image } from '../../typings'
import useFetchImages from '../../hooks/useFetchImages'
import ScrollToTopButton from '../ScrollToTopButton'
import Title from '../Title'
import Loading from '../Loading'
import Card from '../Card'

function HomePage() {
  const [likedImages, setLikedImages] = useState<Image[]>(JSON.parse(localStorage.getItem('nasa-liked-images') || '[]'))
  const [needMoreImages, setNeedMoreImages] = useState(true)
  const { images, isLoading } = useFetchImages(needMoreImages)

  // Observing Last Element on Page to create infinite scroll
  const observer = useRef<IntersectionObserver>()
  const lastImageElementRef = useCallback(
    (element: HTMLDivElement) => {
      observer.current?.disconnect()

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

  const generateCard = (image: Image, index: number, ref?: any) => {
    const { media_type, title, date, url: src, hdurl: highDefSrc, explanation, copyright } = image

    return (
      <Card
        key={index}
        image={{
          media_type: media_type,
          title: title,
          date: date,
          url: src,
          hdurl: highDefSrc,
          explanation: explanation,
          copyright: copyright,
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
          return images.length === index + 3
            ? generateCard(image, index, lastImageElementRef)
            : generateCard(image, index)
        })}
      </section>

      <ScrollToTopButton />
      {isLoading ? <Loading /> : null}
    </>
  )
}

export default HomePage
