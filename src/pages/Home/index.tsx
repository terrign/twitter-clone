import { Footer } from '@components'
import { LINKS } from '@constants'
import { Route } from '@router'
import { signUpWithGoogle, useAppDispatch } from '@store'
import { Button, GoogleIcon, TwitterIcon } from '@ui'
import { Link } from 'react-router-dom'

import { Content, HomeLoginText, HomeTermsText, HomeWrapper, Main, TwitterBackGround } from './styled'

export const Home = () => {
  const { cookie, privacy, terms } = LINKS
  const dispatch = useAppDispatch()

  const googleHanlder = () => {
    dispatch(signUpWithGoogle())
  }

  return (
    <>
      <HomeWrapper>
        <Main>
          <TwitterBackGround />

          <Content>
            <Link to={Route.HOME}>
              <TwitterIcon $size="big" />
            </Link>

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

              <HomeTermsText>
                By singing up you agree to the <a href={terms.href}>{terms.label}</a> and{' '}
                <a href={privacy.href}>{privacy.label}</a>, including <a href={cookie.href}>{cookie.label}</a>.
              </HomeTermsText>

              <HomeLoginText>
                Already have an account? <Link to={Route.SIGN_IN}>Log in</Link>
              </HomeLoginText>
            </div>
          </Content>
        </Main>
        <Footer />
      </HomeWrapper>
    </>
  )
}
