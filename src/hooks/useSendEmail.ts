import { useQuery, UseQueryResult } from '@tanstack/react-query'
import ky from 'ky'

const useSendEmail = (userEmail: string, isUserNeedingToSendEmail: boolean): UseQueryResult<any> => {
  const emailQuery = useQuery(
    ['email'],
    async () => {
      try {
        // @ts-expect-error
        const BACKEND_PROXY_URL = `${import.meta.env.VITE_BACKEND_PROXY_URL}/${userEmail}`
        const request = await ky.get(BACKEND_PROXY_URL, {
          retry: 1,
        })
        if (request.status === 200) {
          const data = await request.json()
          return {
            status: 200,
            message: `Email sent to ${userEmail}`,
            data: data,
          }
        } else {
          return {
            status: request.status,
            statusText: request.statusText,
            message: `Error sending email to ${userEmail}`,
          }
        }

        // return {
        //   status: 200,
        //   message: `Mock Email sent to ${userEmail}. (Did not actually hit backend)`,
        // }
      } catch (err: any) {
        throw new Error(err)
      }
    },
    {
      enabled: isUserNeedingToSendEmail,
    }
  )

  return emailQuery
}

export default useSendEmail
