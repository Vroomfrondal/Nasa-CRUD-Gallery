import React from 'react'
import tw from 'twin.macro'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <>
      <ErrorContainer>
        <h1 className="text-2xl">Oops! Nasa is having a rare issue with their server.</h1>
        <p className="text-xl">Please come back later to try again.</p>

        <LinkContainer>
          <p>Some entertainment in the meantime: </p>

          <FormattedLink>
            <Link to="https://www.youtube.com/watch?v=GDrBIKOR01c&t=435s" target="_blank" rel="noreferrer">
              VSauce Space Video
            </Link>
          </FormattedLink>

          <FormattedLink>
            <Link to="/Favorites" rel="noreferrer">
              Your Favorites
            </Link>
          </FormattedLink>
        </LinkContainer>
      </ErrorContainer>
    </>
  )
}

export default Error

// Containers
const ErrorContainer = tw.div`flex flex-col justify-center items-center h-[50rem] text-cream`
const LinkContainer = tw.div`pt-10 flex flex-col justify-center items-center`

// Elements
const FormattedLink = tw.div`relative text-light_blue hover:text-normal_blue`
