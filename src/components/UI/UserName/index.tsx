import { Route } from '@router'
import { nicknameFromEmail } from '@utils'
import { Link } from 'react-router-dom'

import { StyledUserName } from './styled'

export interface UserNameProps {
  name: string
  email: string
  uid: string
  col?: boolean
  date?: string
}

export const UserName = ({ name, email, col, uid, date }: UserNameProps) => {
  return (
    <StyledUserName $col={col}>
      <Link to={`${Route.PROFILE}/${uid}`}>{name.split(' ')[0]}</Link>
      <p>
        {Boolean(email) && nicknameFromEmail(email)} {date && <span>&bull; {date}</span>}
      </p>
    </StyledUserName>
  )
}
