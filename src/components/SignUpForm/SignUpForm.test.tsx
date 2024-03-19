import { act } from 'react-dom/test-utils'
import { Route } from 'react-router-dom'
import { SignUpForm } from '@components/SignUpForm'
import { inputNameMap } from '@constants/index'
import { authService } from '@services/Auth'
import { Wrappers } from '@test/utils'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ValidationError } from '@utils/formValidationSchemas'

describe('SignUp form', () => {
  const userEvents = userEvent.setup()

  it('Renders, all fields required', async () => {
    render(
      <Wrappers routerEntries={[`/signup`]}>
        <Route path="/" element={<div>welcome</div>} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<div>signin</div>} />
      </Wrappers>,
    )

    const nameInput = screen.getByPlaceholderText(inputNameMap.name.label)
    const emailInput = screen.getByPlaceholderText(inputNameMap.email.label)
    const passwordInput = screen.getByPlaceholderText(inputNameMap.password.label)
    const confirmPasswordInput = screen.getByPlaceholderText(inputNameMap.confirmPassword.label)
    const phoneInput = screen.getByPlaceholderText(inputNameMap.phoneNumber.label)
    const signUpButton = screen.getByText('Next')

    const inputs = [nameInput, emailInput, passwordInput, confirmPasswordInput, phoneInput]

    const requiredErrors = [
      ValidationError.EMAIL_REQUIRED,
      ValidationError.NAME_REQUIRED,
      ValidationError.PASS_REQUIRED,
      ValidationError.PHONE_REQUIRED,
      ValidationError.PASS_CONFIRM_REQUIRED,
      ValidationError.DATE_MONTH,
    ]

    inputs.map((input) => {
      expect(input).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(signUpButton)
    })

    requiredErrors.map((error) => {
      expect(screen.getByText(error)).toBeInTheDocument()
    })
  })

  test('Phone input validation', async () => {
    render(
      <Wrappers routerEntries={[`/signup`]}>
        <Route path="/" element={<div>welcome</div>} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<div>signin</div>} />
      </Wrappers>,
    )

    const phoneInput = screen.getByPlaceholderText(inputNameMap.phoneNumber.label)

    await userEvents.type(phoneInput, '123123')

    expect(screen.getByText(ValidationError.PHONE_INVALID)).toBeInTheDocument()
  })

  test('Date input validation', async () => {
    render(
      <Wrappers routerEntries={[`/signup`]}>
        <Route path="/" element={<div>welcome</div>} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<div>signin</div>} />
      </Wrappers>,
    )

    const monthSelect = screen.getByPlaceholderText(inputNameMap.month.label)
    const yearSelect = screen.getByPlaceholderText(inputNameMap.year.label)
    const daySelect = screen.getByPlaceholderText(inputNameMap.day.label)

    fireEvent.focus(monthSelect)
    fireEvent.click(screen.getByText('December'))

    fireEvent.focus(yearSelect)
    fireEvent.click(screen.getByText('2006'))

    fireEvent.focus(daySelect)
    fireEvent.click(screen.getByText('30'))

    await waitFor(() => expect(screen.getByText(ValidationError.DATE_YOUNG)).toBeInTheDocument())
  })

  test('Allows to signUp', async () => {
    render(
      <Wrappers routerEntries={[`/signup`]}>
        <Route path="/" element={<div>welcome</div>} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<div>signin</div>} />
      </Wrappers>,
    )

    const PASS = 'asd1aSDA@aS$#ASd1dASD2'
    const PHONE = '+12123123123123123'
    const NAME = 'TestName'
    const EMAIL = 'test@email.com'

    const nameInput = screen.getByPlaceholderText(inputNameMap.name.label)
    const emailInput = screen.getByPlaceholderText(inputNameMap.email.label)
    const passwordInput = screen.getByPlaceholderText(inputNameMap.password.label)
    const confirmPasswordInput = screen.getByPlaceholderText(inputNameMap.confirmPassword.label)
    const phoneInput = screen.getByPlaceholderText(inputNameMap.phoneNumber.label)
    const signUpButton = screen.getByText('Next')

    const monthSelect = screen.getByPlaceholderText(inputNameMap.month.label)
    const yearSelect = screen.getByPlaceholderText(inputNameMap.year.label)
    const daySelect = screen.getByPlaceholderText(inputNameMap.day.label)

    fireEvent.change(nameInput, { target: { value: NAME } })
    fireEvent.change(emailInput, { target: { value: EMAIL } })
    fireEvent.change(passwordInput, { target: { value: PASS } })
    fireEvent.change(confirmPasswordInput, { target: { value: PASS } })
    fireEvent.change(phoneInput, { target: { value: PHONE } })

    fireEvent.focus(monthSelect)
    fireEvent.click(screen.getByText('December'))

    fireEvent.focus(yearSelect)
    fireEvent.click(screen.getByText('2000'))

    fireEvent.focus(daySelect)
    fireEvent.click(screen.getByText('30'))

    await act(async () => {
      fireEvent.click(signUpButton)
    })

    await waitFor(() => {
      expect(authService.emailSignUp).toHaveBeenCalledWith(EMAIL, PASS)
    })
  })
})
