import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import generateEmail from '../../utilities/email/generateEmail'
import tw from 'twin.macro'
import Title from '../Title'

// Convert into custom hook
function Newsletter() {
  const [email, setEmail] = useState<string>('')
  const { t } = useTranslation()

  return (
    <>
      <Title title={t('Newsletter')} />

      <ParentContainer>
        <FormBox>
          <FormHeader>
            <p className="text-2xl font-medium">Enter your email!</p>
            <p className="text-xs p-2">
              Get a PDF pamphlet sent from NASA about 60 years of human spaceflight and their achievements.
            </p>
            <Tip className="hidden md:block">Your email is not stored or used to subscribe.</Tip>
          </FormHeader>

          <Inputs>
            <EmailInput
              type="input"
              placeholder="example@something.com"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Submit type="button" onClick={async () => await generateEmail(email)}>
              Submit
            </Submit>
            <Tip className="block md:hidden absolute bottom-1">Your email is not stored or used to subscribe.</Tip>
          </Inputs>
        </FormBox>
      </ParentContainer>
    </>
  )
}

export default Newsletter

// Containers
const ParentContainer = tw.section`flex justify-center h-[70vh]`
const FormBox = tw.form`relative flex flex-col justify-center items-center border border-cream h-3/4 w-[17rem] md:(flex-row w-[35rem]) lg:(w-[40rem]) xl:(w-[45rem]) xxl:(w-[95rem])`

// Form Sections
const FormHeader = tw.section`text-center w-72 md:(relative)`
const Inputs = tw.section`flex flex-col items-center`

// Form Elements
const EmailInput = tw.input`text-black text-center text-sm my-1 py-[0.15rem] w-[13rem] bg-neutral-300 caret-black`
const Submit = tw.button`border border-cream px-2 mt-1`
const Tip = tw.p`text-xs`
