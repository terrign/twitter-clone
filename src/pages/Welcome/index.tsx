import { Link } from 'react-router-dom'
import { WelcomeTwitterBackGroundImage } from '@assets/index'
import { Footer } from '@components/Footer'
import { Button, ButtonType } from '@components/UI/Button'
import { GoogleIcon, TwitterIcon } from '@components/UI/Icons'
import { LINKS } from '@constants/index'
import { Route } from '@router/types'
import { useAppDispatch } from '@store/index'
import { signUpWithGoogle } from '@store/slices/auth'
import { Content, HomeLoginText, HomeTermsText, HomeWrapper, Main, TwitterBackGround } from './styled'

export const Welcome = () => {
  const { cookie, privacy, terms } = LINKS
  const dispatch = useAppDispatch()

  const googleHanlder = () => {
    dispatch(signUpWithGoogle())
  }

  return (
    <HomeWrapper>
      <Main>
        <TwitterBackGround $url={WelcomeTwitterBackGroundImage} />

        <Content>
          <Link to={Route.WELCOME}>
            <TwitterIcon $size="big" />
          </Link>

          <h1>Happening Now</h1>

          <div>
            <h2>Join Twitter today</h2>

            <Button $type={ButtonType.OUTLINED} onClick={googleHanlder}>
              <span>
                <GoogleIcon />
                Sign up with Google
              </span>
            </Button>

            <Link to={Route.SIGN_UP}>
              <Button $type={ButtonType.OUTLINED}>Sign up with email</Button>
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
  )
}
