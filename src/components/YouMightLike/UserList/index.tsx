import { ButtonType } from '@components/UI/Button'
import { UserCard } from '@components/UI/UserCard'
import { UserInfo } from '@models/index'
import { FollowButton, StyledUserList } from './styled'

interface Props {
  users: UserInfo[]
}

export const UserList = ({ users }: Props) => {
  return (
    <StyledUserList>
      {users.map(({ photoURL, name, email, uid }) => {
        return (
          <div key={uid}>
            <UserCard url={photoURL} name={name} email={email} uid={uid} link />
            <FollowButton $type={ButtonType.FILLED}>Follow</FollowButton>
          </div>
        )
      })}
    </StyledUserList>
  )
}
