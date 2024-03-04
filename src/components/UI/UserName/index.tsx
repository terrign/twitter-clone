import { Link } from 'react-router-dom'
import { Route } from '@router'
import { nicknameFromEmail } from '@utils'
import { StyledUserName } from './styled'

export interface UserNameProps {
  name: string
  email: string
  uid: string
  col?: boolean
  date?: string | false
  link?: boolean
}

export const UserName = ({ name, email, col, uid, date, link }: UserNameProps) => {
  return (
    <StyledUserName $col={col}>
      {!link && <p>{name.split(' ')[0]}</p>}
      {link && <Link to={`${Route.PROFILE}/${uid}`}>{name.split(' ')[0]}</Link>}
      <p>
        {Boolean(email) && nicknameFromEmail(email)} {date && <span>&bull; {date}</span>}
      </p>
    </StyledUserName>
  )
}
