import { useEffect, useState } from 'react'
import { Image } from '../typings'
import unixToDate from '../utilities/date-lib/unixToDate'
import dateToUnix from '../utilities/date-lib/dateToUnix'
import getUnixNow from '../utilities/date-lib/getUnixNow'

const useFetchImages = (needMoreImages: boolean) => {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<Image[]>([])
  const [increment, setIncrement] = useState(1)
  const [startDate, setStartDate] = useState(unixToDate(getUnixNow - 518400)) // start w/ last 7 days of data
  const [endDate, setEndDate] = useState(unixToDate(getUnixNow))

  // Updating time frames once week of images has been called
  useEffect(() => {
    setEndDate(() => {
      const startDateAsUnix = dateToUnix(startDate)
      const dayBeforePrevStart = unixToDate(startDateAsUnix - 43200)

      return dayBeforePrevStart
    })

    setStartDate((prevStart) => {
      const prevStartAsUnix = dateToUnix(prevStart)
      const sevenDaysFromStart = unixToDate(prevStartAsUnix - 518400)

      return sevenDaysFromStart
    })
  }, [increment, isLoading])

  // Api Call
  useEffect(() => {
    if (!needMoreImages) return

    const requestApiData = async () => {
      setIncrement((count) => (count += 1))
      setIsLoading(true)
      const URL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${startDate}&end_date=${endDate}`

      const request = await fetch(URL)
      if (request.status === 200) {
        // reversing so today's image shows first
        const data: Image[] = await request.json().then(async (data) => await data.reverse())

        setImages((prevImages) => [...prevImages, ...data])
        setIsLoading(false)
      } else console.error('Failed with status code: ', request)
    }

    requestApiData()
  }, [needMoreImages])

  return { images, isLoading }
}

export default useFetchImages
