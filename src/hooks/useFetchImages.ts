import { useEffect, useState } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import unixToDate from '../utilities/date-lib/unixToDate'
import dateToUnix from '../utilities/date-lib/dateToUnix'
import unixNow from '../utilities/date-lib/unixNow'
import ky from 'ky'

const useFetchImages = (needMoreImages: boolean): UseQueryResult<Image[]> => {
  const [increment, setIncrement] = useState(1)
  const [startDate, setStartDate] = useState(unixToDate(unixNow - 518400)) // start w/ last 7 days of data
  const [endDate, setEndDate] = useState(unixToDate(unixNow))

  const nasaImagesQuery = useQuery(
    ['images'],
    async () => {
      setIncrement((count) => (count += 1))

      try {
        // @ts-expect-error
        const ENV = import.meta.env.VITE_NASA_API_KEY
        const URL = `https://api.nasa.gov/planetary/apod`
        const request = await ky.get(URL, {
          retry: 3,
          searchParams: {
            api_key: ENV,
            start_date: startDate,
            end_date: endDate,
          },
        })

        if (request.status === 200) {
          const nasaData: Image[] = await request.json()

          return nasaData.reverse() // reversing so today's image shows first
        } else {
          console.error('Failed with status code: ', request.status, request.statusText)
          return []
        }
      } catch (err) {
        console.error(err)
        return []
      }
    },
    { enabled: needMoreImages }
  )

  // Updating time frames once week's worth of images have been called
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
  }, [increment, nasaImagesQuery.isFetching])

  return nasaImagesQuery
}

export default useFetchImages
