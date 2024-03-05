import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button, ButtonType } from '@components/UI/Button'
import { Form } from '@components/UI/Form'
import { FormDatepicker } from '@components/UI/Form/FormDatePicker'
import { FormInput } from '@components/UI/Form/FormInput'
import { FormItem } from '@components/UI/Form/FormItem'
import { TwitterIcon } from '@components/UI/Icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { EmailSignUpPayload } from '@models/index'
import { Route } from '@router/types'
import { useAppDispatch } from '@store/index'
import { signUpWithEmail } from '@store/slices/auth'
import { signUpValidationSchema } from '@utils/formValidationSchemas'
import { DateOfBirth, Paragraph, Wrapper } from './styled'

export const SignUpForm = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(signUpValidationSchema()),
  })

  const { handleSubmit } = form

  const dispatch = useAppDispatch()

  const submitHandler = handleSubmit(async ({ day, year, month, email, password, name, phoneNumber }) => {
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
        bio: '',
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
            <Button $type={ButtonType.FILLED} type="submit">
              Next
            </Button>
          </FormItem>
        </Form>
      </FormProvider>
    </Wrapper>
  )
}
