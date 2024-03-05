import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, ButtonType } from '@components/UI/Button'
import { Centered } from '@components/UI/Centered'
import { Form } from '@components/UI/Form'
import { FormItem } from '@components/UI/Form/FormItem'
import { TwitterIcon } from '@components/UI/Icons'
import { Input } from '@components/UI/Input'
import { Route } from '@router/types'
import { useAppDispatch } from '@store/index'
import { signInWithEmail } from '@store/slices/auth'

export const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const loginChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const passwordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const submitHandler = (event: FormEvent) => {
    event.preventDefault()
    dispatch(signInWithEmail({ email, password }))
  }

  return (
    <Centered>
      <Form onSubmit={submitHandler}>
        <FormItem>
          <Link to={Route.WELCOME}>
            <TwitterIcon $size="big" />
          </Link>
        </FormItem>

        <FormItem>
          <h2>Login to Twitter</h2>
        </FormItem>

        <FormItem>
          <Input placeholder="Email address" type="email" value={email} onChange={loginChangeHandler} required />
        </FormItem>

        <FormItem>
          <Input placeholder="Password" type="password" value={password} onChange={passwordChangeHandler} required />
        </FormItem>

        <FormItem>
          <Button $type={ButtonType.FILLED} type="submit">
            Login
          </Button>
        </FormItem>

        <FormItem>
          <Link to={Route.WELCOME}>Sign up to Twitter</Link>
        </FormItem>
      </Form>
    </Centered>
  )
}
