import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import tw, { styled } from 'twin.macro'
import useSendEmail from '../../hooks/useSendEmail'
import Title from '../Title'
import { FcCheckmark } from 'react-icons/fc'

// Convert into custom hook
function Newsletter() {
  const [email, setEmail] = useState<string>('')
  const [isShowingSentCheckmark, setIsShowingSentCheckmark] = useState(false)
  const [usedEmails, setUsedEmails] = useState<string[]>(JSON.parse(localStorage.getItem('used-emails') || '[]'))
  const [isUserNeedingToSendEmail, setIsUserNeedingToSendEmail] = useState(false)

  const { data, isFetched: isEmailSent } = useSendEmail(email, isUserNeedingToSendEmail)
  const { t } = useTranslation()

  //? Frontend: Anti-spam captcha on submit button press?
  //* Frontend: clear input after submit & show sent checmark
  // TODO Frontend: React-form integration
  // TODO DevOps: Find cheaper method than heroku!
  // TODO DevOps: Merge PR & Rebase

  useEffect(() => {
    if (data) {
      console.log('Response data from email query: ', data)
      setIsUserNeedingToSendEmail(false)

      // Anti-spam: add used emails to state array
      if (email) setUsedEmails((prev) => [...prev, email])
      setEmail('')
      setIsShowingSentCheckmark(true)
    }
  }, [data])

  // Anti-Spam: store used emails in local storage
  useEffect(() => {
    if (usedEmails.length) localStorage.setItem('used-emails', JSON.stringify(usedEmails))
  }, [usedEmails])

  // Showing "sent" checkmark after sending email
  useEffect(() => {
    if (isShowingSentCheckmark) {
      setTimeout(() => {
        setIsShowingSentCheckmark(false)
      }, 2000)
    }
  }, [isShowingSentCheckmark])

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

          <InputContainer className=" flex">
            <Inputs>
              <EmailInput
                isInvalidInput={isReusedEmail(email)}
                type="input"
                placeholder="example@something.com"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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
                <Submitted>{t('Email already sent!')}</Submitted>
              )}

              {isEmailSent && isShowingSentCheckmark ? <FcCheckmark size={25} /> : null}

              <Tip className="block md:hidden absolute bottom-1 text-center">
                {t('Your email is not stored or used to subscribe. test test test')}
              </Tip>
            </Inputs>
          </InputContainer>
        </FormBox>
      </ParentContainer>
    </>
  )
}

export default Newsletter

// Containers
const ParentContainer = tw.section`flex justify-center h-[70vh]`
const FormBox = tw.form`relative flex flex-col justify-center items-center border border-cream h-3/4 w-[17rem] md:(flex-row w-[35rem]) lg:(w-[40rem]) xl:(w-[45rem]) xxl:(w-[95rem])`
const InputContainer = tw.section`flex`

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
