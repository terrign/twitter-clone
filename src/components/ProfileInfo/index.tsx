import { useNavigate } from 'react-router-dom'
import { Route } from '@router'
import { useAppSelector } from '@store'
import { UserInfo } from '@types'
import { Avatar, Button, UserName } from '@ui'
import { Bio, StyledProfileInfo } from './styled'

export const ProfileInfo = ({ user }: { user: UserInfo }) => {
  const { photoURL, name, email, bio, uid } = user

  const currentUserId = useAppSelector((state) => state.user.user.uid)

  const nav = useNavigate()

  const isCurrentUserProfile = currentUserId === uid

  return (
    <StyledProfileInfo>
      <div>
        <Avatar size="l" photoURL={photoURL} />
        <UserName name={name} email={email} uid={uid} col />
        <Bio>{bio}</Bio>
      </div>
      {isCurrentUserProfile && (
        <Button $type="outlined" onClick={() => nav(`${Route.PROFILE}/${uid}/edit`)}>
          Edit profile
        </Button>
      )}
    </StyledProfileInfo>
  )
}
