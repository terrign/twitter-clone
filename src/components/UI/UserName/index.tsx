import { nicknameFromEmail } from '@utils'

import { StyledUserName } from './styled'

export interface UserNameProps {
  name: string
  email: string
  col?: boolean
}

export const UserName = ({ name, email, col }: UserNameProps) => {
  return (
    <StyledUserName $col={col}>
      <p>{name.split(' ')[0]}</p>
      <p>{nicknameFromEmail(email)}</p>
    </StyledUserName>
  )
}
