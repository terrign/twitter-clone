import { NavLink, useLocation } from 'react-router-dom'
import { Route } from '@router/types'
import { store } from '@store/index'
import { StyledNavItem } from './styled'

interface Props {
  label: string
  icon: {
    filled: JSX.Element
    outlined: JSX.Element
  }
  path: Route
}

export const NavItem = (props: Props) => {
  const { label, icon, path } = props
  const { filled, outlined } = icon
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
