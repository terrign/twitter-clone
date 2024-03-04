import { NavLink, useLocation } from 'react-router-dom'
import { Route } from '@router'
import { store } from '@store'
import { StyledNavItem } from './styled'

export interface NavItemProps {
  label: string
  icon: {
    filled: JSX.Element
    outlined: JSX.Element
  }
  path: Route
}

export const NavItem = ({ label, icon: { filled, outlined }, path }: NavItemProps) => {
  const { pathname } = useLocation()

  const realPath = label === 'Profile' ? `${path}/${store.getState().user.user.uid}` : path

  return (
    <StyledNavItem $title={label}>
      <NavLink to={realPath}>
        <div>{pathname.includes(path) ? filled : outlined}</div>

        <span>{label}</span>
      </NavLink>
    </StyledNavItem>
  )
}
