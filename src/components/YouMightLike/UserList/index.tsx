import { UserInfo } from '@types'
import { UserCard } from '@ui'
import { FollowButton, StyledUserList } from './styled'

export const UserList = ({ users }: { users: UserInfo[] }) => {
  return (
    <StyledUserList>
      {users.map(({ photoURL, name, email, uid }) => {
        return (
          <div key={uid}>
            <UserCard url={photoURL} name={name} email={email} uid={uid} link />
            <FollowButton $type="filled">Follow</FollowButton>
          </div>
        )
      })}
    </StyledUserList>
  )
}
