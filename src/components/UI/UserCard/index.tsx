import { Avatar, UserName } from '@ui'

import { StyledUserCard } from './styled'

export interface UserCardProps {
  url: string
  name: string
  email: string
}

export const UserCard = ({ url, name, email }: UserCardProps) => {
  return (
    <StyledUserCard>
      <Avatar photoURL={url} size="s" />
      <UserName col name={name} email={email} />
    </StyledUserCard>
  )
}
