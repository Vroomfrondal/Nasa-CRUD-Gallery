import { useEffect, useState } from 'react'
import unixToDate from '../utilities/date-lib/unixToDate'
import dateToUnix from '../utilities/date-lib/dateToUnix'
import unixNow from '../utilities/date-lib/unixNow'
import ky from 'ky'

const useFetchImages = (needMoreImages: boolean) => {
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<Image[]>([])
  const [increment, setIncrement] = useState(1)
  const [startDate, setStartDate] = useState(unixToDate(unixNow - 518400)) // start w/ last 7 days of data
  const [endDate, setEndDate] = useState(unixToDate(unixNow))

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

      // @ts-expect-error
      const env = import.meta.env.VITE_NASA_API_KEY
      const URL = `https://api.nasa.gov/planetary/apod` // ?api_key=${env}&start_date=${startDate}&end_date=${endDate}

      try {
        const request = await ky.get(URL, {
          retry: 3,
          searchParams: {
            api_key: env,
            start_date: startDate,
            end_date: endDate,
          },
        })
        if (request.status === 200) {
          // reversing so today's image shows first
          const data: Image[] = await request.json()
          data.reverse()

          setImages((prevImages) => [...prevImages, ...data])
          setIsLoading(false)
        } else console.error('Failed with status code: ', request.status, request.statusText)
      } catch (err) {
        console.error(err)
      }
    }

    requestApiData()
  }, [needMoreImages])

  return { images, isLoading }
}

export default useFetchImages
