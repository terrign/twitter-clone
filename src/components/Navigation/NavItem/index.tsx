import { Route } from '@router'
import { NavLink, useLocation } from 'react-router-dom'

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

  return (
    <StyledNavItem $title={label}>
      <NavLink to={path}>
        <div>{pathname.includes(path) ? filled : outlined}</div>

        <span>{label}</span>
      </NavLink>
    </StyledNavItem>
  )
}
