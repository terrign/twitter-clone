import { PropsWithChildren } from 'react'
import { Link, useLocation, useOutletContext } from 'react-router-dom'
import { LeftArrow } from '@assets'
import { Route } from '@router'
import { AsideButton, HeaderBlock, StyledHeader } from './styled'
import { ThemeToggler } from './ThemeToggler'

export const Header = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation()
  const toggleAside = useOutletContext<() => void>()

  return (
    <StyledHeader>
      <HeaderBlock>
        {pathname !== Route.HOME && (
          <Link to={Route.HOME}>
            <LeftArrow />
          </Link>
        )}

        <div>{children}</div>
      </HeaderBlock>
      <HeaderBlock>
        {pathname === Route.HOME && <ThemeToggler />}
        <AsideButton onClick={toggleAside}>
          <LeftArrow />
        </AsideButton>
      </HeaderBlock>
    </StyledHeader>
  )
}
