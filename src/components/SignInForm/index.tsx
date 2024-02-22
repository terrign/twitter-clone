import { Route } from '@router'
import { signInWithEmail, useAppDispatch } from '@store'
import { Button, Centered, Form, FormItem, Input, TwitterIcon } from '@ui'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

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
          <Input placeholder="Email address" type="email" value={email} onChange={loginChangeHandler} />
        </FormItem>

        <FormItem>
          <Input placeholder="Password" type="password" value={password} onChange={passwordChangeHandler} />
        </FormItem>

        <FormItem>
          <Button $type="filled" type="submit">
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
