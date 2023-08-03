import axios from 'axios'
import axiosRetry from 'axios-retry'

const generateEmail = async (recipientEmail: string) => {
  //@ts-expect-error
  const URL = `${import.meta.env.VITE_SENDGRID_URL}`
  const CONFIG = {
    headers: {
      //@ts-expect-error
      Authorization: `Bearer ${import.meta.env.VITE_SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    data: {
      personalizations: [
        {
          to: [{ email: recipientEmail }],
          subject: 'Test',
        },
      ],
      //@ts-expect-error
      from: { email: import.meta.env.VITE_VERIFIED_SENDER },
      content: [
        {
          type: 'text/plain',
          value: 'Some content',
        },
      ],
    },
  }

  // Retry support
  axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
  })

  // Send email
  try {
    const request = await axios.post(URL, CONFIG.data, CONFIG)

    if (request.status === 200 || request.status === 202) {
      console.log('Email sent successfully!')
    } else {
      console.error('Email attempted to deliver but failed.')
    }
  } catch (e) {
    console.error('Error with axios call: ', e)
  }
}

export default generateEmail
