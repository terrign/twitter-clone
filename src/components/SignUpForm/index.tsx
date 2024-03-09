import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, ButtonType } from '@components/UI/Button'
import { Form } from '@components/UI/Form'
import { FormDatepicker } from '@components/UI/Form/FormDatePicker'
import { FormInput } from '@components/UI/Form/FormInput'
import { FormItem } from '@components/UI/Form/FormItem'
import { TwitterIcon } from '@components/UI/Icons'
import { EmailSignUpPayload } from '@models/index'
import { Route } from '@router/types'
import { useAppDispatch } from '@store/index'
import { signUpWithEmail } from '@store/slices/auth'
import { getIsoDateFromParts } from '@utils/date'
import { signUpValidationSchema } from '@utils/formValidationSchemas'
import { config } from './config'
import { DateOfBirth, Paragraph, Wrapper } from './styled'

const { dateOfBirthHeader, dateOfBirthText, submitButtonLabel, header, linkLabel } = config

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
        dateOfBirth: getIsoDateFromParts(day, month, year),
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
            <h2>{header}</h2>
          </FormItem>

          <FormInput name="name" />

          <FormInput name="email" />

          <FormInput name="phoneNumber" />

          <FormInput name="password" />

          <FormInput name="confirmPassword" />

          <FormItem>
            <Link to={Route.HOME}>{linkLabel}</Link>
          </FormItem>

          <FormItem>
            <DateOfBirth>{dateOfBirthHeader}</DateOfBirth>
          </FormItem>

          <FormItem>
            <Paragraph>{dateOfBirthText}</Paragraph>
          </FormItem>

          <FormDatepicker />

          <FormItem>
            <Button $type={ButtonType.FILLED} type="submit">
              {submitButtonLabel}
            </Button>
          </FormItem>
        </Form>
      </FormProvider>
    </Wrapper>
  )
}
