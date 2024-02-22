import { Route } from '@router'
import { signOut, useAppDispatch, useAppSelector } from '@store'
import { Button, TwitterIcon, UserCard } from '@ui'
import { NavLink } from 'react-router-dom'

import { navLinks } from './constants'
import { NavItem } from './NavItem'
import { LogoutButton, StyledAsideNavigation } from './styled'

export const Navigation = () => {
  const dispatch = useAppDispatch()

  const { name, email, photoURL } = useAppSelector((state) => state.user.user)

  const logoutHandler = () => {
    dispatch(signOut())
  }

  return (
    <StyledAsideNavigation>
      <NavLink to={Route.HOME}>
        <TwitterIcon $size="default" />
      </NavLink>

      <nav>
        {navLinks.map((a) => (
          <NavItem {...a} key={a.label} />
        ))}
      </nav>

      <Button $type="filled">Tweet</Button>
      <div>
        <UserCard name={name} email={email} url={photoURL} />
      </div>

      <LogoutButton $type="filled" onClick={logoutHandler}>
        Log out
      </LogoutButton>
    </StyledAsideNavigation>
  )
}
