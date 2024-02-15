import { login } from '@auth'
import { Footer } from '@components'
import { LINKS } from '@constants'
import { Route } from '@router'
import { Button, GoogleIcon, TwitterIcon } from '@ui'
import { Link } from 'react-router-dom'

import { Content, HomeWrapper, Main, TwitterBackGround } from './styled'

export const Home = () => {
  const { cookie, privacy, terms } = LINKS

  const googleHanlder = async () => {
    login()
  }

  return (
    <>
      <HomeWrapper>
        <Main>
          <TwitterBackGround />

          <Content>
            <TwitterIcon $size="big" />

            <h1>Happening Now</h1>

            <div>
              <h2>Join Twitter today</h2>

              <Button $type="outlined" onClick={googleHanlder}>
                <span>
                  <GoogleIcon />
                  Sign up with Google
                </span>
              </Button>

              <Link to={Route.SIGN_UP}>
                <Button $type="outlined">Sign up with email</Button>
              </Link>

              <p>
                By singing up you agree to the <a href={terms.href}>{terms.label}</a> and{' '}
                <a href={privacy.href}>{privacy.label}</a>, including <a href={cookie.href}>{cookie.label}</a>.
              </p>

              <p>
                Already have an account? <Link to={Route.SIGN_IN}>Log in</Link>
              </p>
            </div>
          </Content>
        </Main>
        <Footer />
      </HomeWrapper>
    </>
  )
}
