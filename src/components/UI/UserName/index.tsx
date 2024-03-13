import { Link } from 'react-router-dom'
import { Route } from '@router/types'
import { nicknameFromEmail } from '@utils/index'
import { StyledUserName } from './styled'

export interface Props {
  name: string
  email: string
  uid: string
  col?: boolean
  date?: string | false
  link?: boolean
}

export const UserName = (props: Props) => {
  const { name, email, col, uid, date, link } = props
  const displayName = name.split(' ')[0]

  return (
    <StyledUserName $col={col}>
      {!link && <p>{displayName}</p>}
      {link && <Link to={`${Route.PROFILE}/${uid}`}>{displayName}</Link>}
      <p>
        {Boolean(email) && nicknameFromEmail(email)} {date && <span>&bull; {date}</span>}
      </p>
    </StyledUserName>
  )
}
