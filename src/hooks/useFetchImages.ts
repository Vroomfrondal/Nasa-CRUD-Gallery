import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import unixToDate from '../utilities/date-lib/unixToDate'
import dateToUnix from '../utilities/date-lib/dateToUnix'
import unixNow from '../utilities/date-lib/unixNow'
import ky from 'ky'

type UseFetchImagesResult = {
  isLoading: boolean
  error?: Error
  data: Image[]
}

const useFetchImages = (needMoreImages: boolean): UseFetchImagesResult => {
  const [increment, setIncrement] = useState(1)
  const [startDate, setStartDate] = useState(unixToDate(unixNow - 518400)) // start w/ last 7 days of data
  const [endDate, setEndDate] = useState(unixToDate(unixNow))

  const {
    isLoading,
    error,
    data: images,
  } = useQuery({
    enabled: needMoreImages,
    queryKey: ['images'],
    queryFn: async () => {
      if (!needMoreImages) return

      setIncrement((count) => (count += 1))
      // @ts-expect-error
      const ENV = import.meta.env.VITE_NASA_API_KEY
      const URL = `https://api.nasa.gov/planetary/apod`

      try {
        const request = await ky.get(URL, {
          retry: 3,
          searchParams: {
            api_key: ENV,
            start_date: startDate,
            end_date: endDate,
          },
        })

        if (request.status === 200) {
          // reversing so today's image shows first
          const nasaData: Image[] = await request.json()
          nasaData.reverse()

          return nasaData
        } else {
          console.error('Failed with status code: ', request.status, request.statusText)
        }
      } catch (err) {
        console.error(err)
      }
    },
  })

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

  if (isLoading) return { isLoading: true, data: images || [] }
  if (error) return { isLoading: false, data: images || [] }

  return { isLoading, data: images || [] }
}

export default useFetchImages
