import { yupResolver } from '@hookform/resolvers/yup'
import { Route } from '@router'
import { signUpWithEmail, useAppDispatch } from '@store'
import { EmailSignUpPayload } from '@types'
import { Button, Form, FormDatepicker, FormInput, FormItem, TwitterIcon } from '@ui'
import { signUpValidationSchema } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { DateOfBirth, Paragraph, Wrapper } from './styled'

export const SignUpForm = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpValidationSchema()),
  })

  const { handleSubmit, getValues } = form

  const dispatch = useAppDispatch()

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

    dispatch(signUpWithEmail(signUpData))
  })

  return (
    <Wrapper>
      <FormProvider {...form}>
        <Form onSubmit={submitHandler}>
          <FormItem>
            <Link to={Route.WELCOME}>
              <TwitterIcon $size="big" />
            </Link>
          </FormItem>

          <FormItem>
            <h2>Create an account</h2>
          </FormItem>

          <FormInput name="name" />

          <FormInput name="email" />

          <FormInput name="phoneNumber" />

          <FormInput name="password" />

          <FormInput name="confirmPassword" />

          <FormItem>
            <Link to={Route.HOME}>Use email</Link>
          </FormItem>

          <FormItem>
            <DateOfBirth>Date of Birth</DateOfBirth>
          </FormItem>

          <FormItem>
            <Paragraph>
              Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh sit. Quis bibendum ante phasellus metus,
              magna lacinia sed augue. Odio enim nascetur leo mauris vel eget. Pretium id ullamcorper blandit viverra
              dignissim eget tellus. Nibh mi massa in molestie a sit. Elit congue.
            </Paragraph>
          </FormItem>

          <FormDatepicker />

          <FormItem>
            <Button $type="filled" type="submit">
              Next
            </Button>
          </FormItem>
        </Form>
      </FormProvider>
    </Wrapper>
  )
}
