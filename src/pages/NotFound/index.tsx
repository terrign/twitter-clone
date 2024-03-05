import { Link } from 'react-router-dom'
import { NotFoundBackGround } from '@assets/index'
import { ButtonType } from '@components/UI/Button'
import { Route } from '@router/types'
import { BackHomeButton, Container, StyledNotFound } from './styled'

export const NotFound = () => {
  return (
    <StyledNotFound>
      <Container>
        <div>
          <article>
            <h1>Oops</h1>
            <p>The page you are looking for does not exist</p>
          </article>
          <Link to={Route.WELCOME}>
            <BackHomeButton $type={ButtonType.FILLED}>Back Home</BackHomeButton>
          </Link>
        </div>

        <NotFoundBackGround />
      </Container>
    </StyledNotFound>
  )
}
