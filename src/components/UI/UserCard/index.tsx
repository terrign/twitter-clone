import { Avatar, AvatarSize } from '@components/UI/Avatar'
import { UserName } from '@components/UI/UserName'
import { StyledUserCard } from './styled'

interface Props {
  url: string
  name: string
  email: string
  uid: string
  link?: boolean
}

export const UserCard = (props: Props) => {
  const { url, name, email, uid, link } = props

  return (
    <StyledUserCard>
      <Avatar photoURL={url} size={AvatarSize.SMALL} />
      <UserName col name={name} email={email} uid={uid} link={link} />
    </StyledUserCard>
  )
}
