import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import useFetchImages from '../../hooks/useFetchImages'
import ScrollToTopButton from '../ScrollToTopButton'
import Title from '../Title'
import Loading from '../Loading'
import Card from '../Card'
import Error from './Error'

function HomePage() {
  const [images, setImages] = useState<Image[]>([])
  const [likedImages, setLikedImages] = useState<Image[]>(JSON.parse(localStorage.getItem('nasa-liked-images') || '[]'))
  const [needMoreImages, setNeedMoreImages] = useState(true)
  const { data, isFetching, error } = useFetchImages(needMoreImages)

  // Observing the last element on page to create infinite scroll by calling next set of images
  const observer = useRef<IntersectionObserver>()
  const lastImageElementRef = useCallback(
    (element: HTMLDivElement) => {
      observer.current?.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (!isFetching && entries[0].isIntersecting) setNeedMoreImages(true)
      })

      if (element) observer.current.observe(element)
      setNeedMoreImages(false)
    },
    [!isFetching]
  )

  // Storing images returned from useFetchImages hook
  useEffect(() => {
    if (isFetching) return
    data ? setImages((prevImages) => [...prevImages, ...(data as Image[])]) : null
  }, [data, isFetching])

  // Updating db after liking/unliking an image
  useEffect(() => {
    localStorage.setItem('nasa-liked-images', JSON.stringify(likedImages))
  }, [likedImages])

  const { t } = useTranslation()

  const generateCard = (image: Image, index: number, ref?: any) => {
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
        ref={ref}
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
      {!error ? (
        <>
          <Title title={t('Beyond Our Earth')} />

          <section className="container">
            {images.map((image, index) => {
              return images.length === index + 3
                ? generateCard(image, index, lastImageElementRef)
                : generateCard(image, index)
            })}
          </section>

          <ScrollToTopButton />
          {isFetching ? <Loading /> : null}
        </>
      ) : (
        <Error />
      )}
    </>
  )
}

export default HomePage
