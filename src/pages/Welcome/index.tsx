import { Link } from 'react-router-dom'
import { WelcomeTwitterBackGroundImage } from '@assets/index'
import { Footer } from '@components/Footer'
import { Button, ButtonType } from '@components/UI/Button'
import { GoogleIcon, TwitterIcon } from '@components/UI/Icons'
import { Route } from '@router/types'
import { useAppDispatch } from '@store/index'
import { signUpWithGoogle } from '@store/slices/auth'
import { config } from './config'
import { Content, HomeLoginText, HomeTermsText, HomeWrapper, Main, TwitterBackGround } from './styled'

const { header, subHeader, emailButtonLabel, googleButtonLabel, termsText, loginLinkLabel, loginQuestion } = config

export const Welcome = () => {
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

          <h1>{header}</h1>

          <div>
            <h2>{subHeader}</h2>

            <Button $type={ButtonType.OUTLINED} onClick={googleHanlder}>
              <span>
                <GoogleIcon />
                {googleButtonLabel}
              </span>
            </Button>

            <Link to={Route.SIGN_UP}>
              <Button $type={ButtonType.OUTLINED}>{emailButtonLabel}</Button>
            </Link>

            <HomeTermsText>{termsText}</HomeTermsText>

            <HomeLoginText>
              {loginQuestion} <Link to={Route.SIGN_IN}>{loginLinkLabel}</Link>
            </HomeLoginText>
          </div>
        </Content>
      </Main>
      <Footer />
    </HomeWrapper>
  )
}
