import React from 'react'
import tw from 'twin.macro'
import Title from '../Title'
import { useTranslation } from 'react-i18next'

function Newsletter() {
  const { t } = useTranslation()

  return (
    <>
      <Title title={t('Newsletter')} />
      <FormParentContainer>
        <FormBox action="" method="post"></FormBox>
      </FormParentContainer>
    </>
  )
}

export default Newsletter

const FormParentContainer = tw.section`flex justify-center items-center h-[76vh]`
const FormBox = tw.form`flex justify-center items-center border border-cream h-3/4 w-[15rem] md:(w-[35rem]) lg:(w-[40rem]) xl:(w-[45rem]) xxl:(w-[95rem])`

// TODO
// Small viewport needs to be column style
// Med Viewport + use horizontal style of forms
