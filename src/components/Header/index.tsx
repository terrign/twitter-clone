import { PropsWithChildren } from 'react'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import { LeftArrow } from '@assets/index'
import { Route } from '@router/types'
import { AsideButton, HeaderBlock, StyledHeader } from './styled'
import { ThemeToggler } from './ThemeToggler'

export const Header = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation()
  const toggleAside = useOutletContext<() => void>()

  const isAtHomeRoute = pathname === Route.HOME

  return (
    <StyledHeader>
      <HeaderBlock>
        {!isAtHomeRoute && (
          <Link to={Route.HOME}>
            <LeftArrow />
          </Link>
        )}

        <div>{children}</div>
      </HeaderBlock>
      <HeaderBlock>
        {isAtHomeRoute && <ThemeToggler />}
        <AsideButton onClick={toggleAside}>
          <LeftArrow />
        </AsideButton>
      </HeaderBlock>
    </StyledHeader>
  )
}
