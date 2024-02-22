import { Route } from '@router'
import { useRef } from 'react'
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

  const linkRef = useRef<HTMLAnchorElement>(null)

  return (
    <StyledNavItem>
      <NavLink to={path} ref={linkRef}>
        <div>{pathname.includes(path) ? filled : outlined}</div>

        <span>{label}</span>
      </NavLink>
    </StyledNavItem>
  )
}
