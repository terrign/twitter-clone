import { yupResolver } from '@hookform/resolvers/yup'
import { EmailSignUpPayload } from '@types'
import { Button, Form, FormDatepicker, FormInput, FormItem } from '@ui'
import { signUpValidationSchema } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'

export const EditProfileForm = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpValidationSchema()),
  })

  const { handleSubmit, getValues } = form

  const submitHandler = handleSubmit(async () => {
    const { day, year, month, email, password, name, phoneNumber } = getValues()

    const signUpData: EmailSignUpPayload = {
      password,
      email,
      userInfo: {
        email,
        name,
        phoneNumber,
        dateOfBirth: `${year}-${month}-${day}`,
        gender: '',
        tgLink: '',
      },
    }

    console.log(signUpData)
  })

  return (
    <FormProvider {...form}>
      <Form onSubmit={submitHandler}>
        <FormInput name="name" />

        <FormInput name="email" />

        <FormInput name="phoneNumber" />

        <FormDatepicker />

        <FormItem>
          <Button $type="filled" type="submit">
            Save
          </Button>
        </FormItem>
      </Form>
    </FormProvider>
  )
}
