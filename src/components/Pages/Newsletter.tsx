import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FcCheckmark } from 'react-icons/fc'
import tw, { styled } from 'twin.macro'
import useSendEmail from '../../hooks/useSendEmail'
import Title from '../Title'

type NewsletterInputs = {
  email: string
}

function Newsletter() {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NewsletterInputs>()

  const { t } = useTranslation()
  const [isShowingSentCheckmark, setIsShowingSentCheckmark] = useState(false)
  const [usedEmails, setUsedEmails] = useState<string[]>(JSON.parse(localStorage.getItem('used-emails') || '[]'))
  const [isUserNeedingToSendEmail, setIsUserNeedingToSendEmail] = useState(false)
  const { data: emailResponse, isFetched: isEmailSent } = useSendEmail(watch('email'), isUserNeedingToSendEmail)

  // Email response logic (add users to sent-storage, show sent-checkmark)
  useEffect(() => {
    if (emailResponse && watch('email') && watch('email') !== '') {
      setIsUserNeedingToSendEmail(false)
      setUsedEmails((prev) => [...prev, watch('email')])
      setIsShowingSentCheckmark(true)
    }
  }, [emailResponse])

  // Anti-Spam: store used emails in local storage & clear value
  useEffect(() => {
    if (usedEmails.length) {
      localStorage.setItem('used-emails', JSON.stringify(usedEmails))
      setValue('email', '')
    }
  }, [usedEmails])

  // Showing "sent" checkmark after sending email
  useEffect(() => {
    if (isShowingSentCheckmark) {
      setTimeout(() => {
        setIsShowingSentCheckmark(false)
      }, 2000)
    }
  }, [isShowingSentCheckmark])

  const onSubmit: SubmitHandler<NewsletterInputs> = (data) => {
    const { email } = data

    if (!email || !email.includes('@') || isReusedEmail(email)) alert('Please enter a valid email.')
    else setIsUserNeedingToSendEmail(true)
  }

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
        <FormBox onSubmit={handleSubmit(onSubmit)}>
          <FormHeader>
            <p className="text-2xl font-medium">{t('Enter your email!')}</p>
            <p className="text-xs p-2">
              {t('Get a PDF pamphlet sent from NASA about 60 years of human spaceflight and their achievements.')}
            </p>
            <Tip className="hidden md:block">{t('Your email is not stored or used to subscribe.')}</Tip>
          </FormHeader>

          <InputContainer>
            <Inputs>
              {errors.email && <span className="text-sm text-red-500">Please enter a valid email.</span>}
              <EmailInput
                {...register('email', { required: true, minLength: 5 })}
                isInvalidInput={isReusedEmail(watch('email'))}
                type="input"
                placeholder="example@something.com"
                required={true}
              />

              {!isReusedEmail(watch('email')) ? (
                <Submit type="submit" onClick={() => console.log('Error: ', errors)}>
                  {t('Submit')}
                </Submit>
              ) : (
                <Submitted>{t('Email already sent!')}</Submitted>
              )}

              {isEmailSent && isShowingSentCheckmark ? <FcCheckmark size={25} /> : null}

              <Tip className="block md:hidden absolute bottom-1 text-center">
                {t('Your email is not stored or used to subscribe.')}
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

// Form Inputs
const Submit = tw.button`border border-cream px-2 mt-1`
const Submitted = tw.span`text-sm`
const Tip = tw.p`text-xs`

const EmailInput = styled.input<{ isInvalidInput?: boolean }>(({ isInvalidInput }) => [
  tw`text-black text-center text-sm my-1 py-[0.15rem] w-[13rem] bg-neutral-300 caret-black focus:(outline-none)`,
  isInvalidInput ? tw`border-2 border-red-500 animate-shake` : tw`border-none`,
])
