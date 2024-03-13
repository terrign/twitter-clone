import { Link } from 'react-router-dom'
import { NotFoundBackGround } from '@assets/index'
import { ButtonType } from '@components/UI/Button'
import { Route } from '@router/types'
import { config } from './config'
import { BackHomeButton, Container, StyledNotFound } from './styled'

const { header, text, buttonLabel } = config

export const NotFound = () => {
  return (
    <StyledNotFound>
      <Container>
        <div>
          <article>
            <h1>{header}</h1>
            <p>{text}</p>
          </article>
          <Link to={Route.WELCOME}>
            <BackHomeButton $type={ButtonType.FILLED}>{buttonLabel}</BackHomeButton>
          </Link>
        </div>

        <NotFoundBackGround />
      </Container>
    </StyledNotFound>
  )
}
