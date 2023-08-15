import React from 'react'
import tw from 'twin.macro'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Error() {
  const { t } = useTranslation()

  return (
    <ErrorContainer>
      <h1 className="text-2xl text-center">{t('Oops! Nasa is having a rare issue with their server.')}</h1>
      <p className="text-xl text-center">{t('Please come back later to try again.')}</p>
      <LinkContainer>
        <p>{t('Some entertainment in the meantime:')}</p>

        <FormattedLink>
          <Link to="https://youtu.be/ryg077wBvsM" target="_blank" rel="noreferrer">
            {t('The Great Silence (LEMMiNO)')}
          </Link>
        </FormattedLink>

        <FormattedLink>
          <Link to="/Favorites" rel="noreferrer">
            {t('Your Favorites')}
          </Link>
        </FormattedLink>

        <FormattedLink>
          <Link className="z-50" to="https://github.com/nasa/apod-api/issues" target="_blank" rel="noreferrer">
            {t('Latest API issues')}
          </Link>
        </FormattedLink>
      </LinkContainer>
    </ErrorContainer>
  )
}

export default Error

// Containers
const Container = tw.div`flex flex-col justify-center items-center`
const ErrorContainer = tw(Container)`h-[50rem] text-cream`
const LinkContainer = tw(Container)`items-center pt-10`

// Elements
const FormattedLink = tw.div`relative text-light_blue hover:text-normal_blue`
