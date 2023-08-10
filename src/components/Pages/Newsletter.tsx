import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import tw, { styled } from 'twin.macro'
import useSendEmail from '../../hooks/useSendEmail'
import Title from '../Title'

// Convert into custom hook
function Newsletter() {
  const [email, setEmail] = useState<string>('')
  const [usedEmails, setUsedEmails] = useState<string[]>(JSON.parse(localStorage.getItem('used-emails') || '[]'))
  const [isUserNeedingToSendEmail, setIsUserNeedingToSendEmail] = useState(false)

  const { data } = useSendEmail(email, isUserNeedingToSendEmail)
  const { t } = useTranslation()

  //* Fronted: test if live backend URL is working
  //* Frontend: reset state after its turned to true
  //* Frontend: Email input sanitation / clear input after clicking (will happen when you develop modal)
  //* Frontend: local storage to prevent repeat emails
  //* Frontend: Create email success/error transition screen
  // TODO Frontend: Anti-spam captcha on submit button press?
  // TODO Frontend: Translation text (pass in context hook)!
  // TODO Backend: Rate Limiting
  // TODO Backend: add PDF attachment w/ base64 encoding!
  // TODO DevOps: Remove all o-auth integrations unused on github
  // TODO DevOps: Verify heroku payments!
  // TODO DevOps: Merge PR & Rebase
  useEffect(() => {
    if (data) {
      console.log('Response data from email query: ', data)
      setIsUserNeedingToSendEmail(false)

      // Anti-spam: add used emails to state array
      if (email) setUsedEmails((prev) => [...prev, email])
    }
  }, [data])

  // Anti-Spam: store used emails in local storage
  useEffect(() => {
    if (usedEmails.length) localStorage.setItem('used-emails', JSON.stringify(usedEmails))
  }, [usedEmails])

  const isReusedEmail = (email: string) => {
    const isReusedEmail = usedEmails.some((usedEmail) => {
      if (usedEmail === email) return true
      else return false
    })

    return isReusedEmail
  }

  return (
    <>
      <Title title={t('Newsletter')} />

      <ParentContainer>
        <FormBox onSubmit={(e) => e.preventDefault()}>
          <FormHeader>
            <p className="text-2xl font-medium">{t('Enter your email!')}</p>
            <p className="text-xs p-2">
              {t('Get a PDF pamphlet sent from NASA about 60 years of human spaceflight and their achievements.')}
            </p>
            <Tip className="hidden md:block">{t('Your email is not stored or used to subscribe.')}</Tip>
          </FormHeader>

          <Inputs>
            <EmailInput
              isInvalidInput={isReusedEmail(email)}
              type="input"
              placeholder="example@something.com"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!isReusedEmail(email) ? (
              <Submit
                type="button"
                onClick={() => {
                  // Form Validation
                  if (!email || !email.includes('@') || isReusedEmail(email)) alert('Invalid input.')
                  else setIsUserNeedingToSendEmail(true)
                }}
              >
                {t('Submit')}
              </Submit>
            ) : (
              <Submitted>{t('Email sent!')}</Submitted>
            )}

            <Tip className="block md:hidden absolute bottom-1">
              {t('Your email is not stored or used to subscribe.')}
            </Tip>
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
const Submit = tw.button`border border-cream px-2 mt-1`
const Submitted = tw.span`text-sm`
const Tip = tw.p`text-xs`

const EmailInput = styled.input<{ isInvalidInput?: boolean }>(({ isInvalidInput }) => [
  tw`text-black text-center text-sm my-1 py-[0.15rem] w-[13rem] bg-neutral-300 caret-black focus:(outline-none)`,
  isInvalidInput ? tw`border-2 border-red-500 animate-shake` : tw`border-none`,
])
