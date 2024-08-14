import { LINKS } from '@constants/index'
import { StyledFooter } from './styled'

export const Footer = () => {
  return (
    <StyledFooter>
      {Object.values(LINKS).map(({ label, href }) => {
        return (
          <a href={href} key={label}>
            {label}
          </a>
        )
      })}
      <span>©{new Date().getUTCFullYear()} Twitter, Inc.</span>
    </StyledFooter>
  )
}
