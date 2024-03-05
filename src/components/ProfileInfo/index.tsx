import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarSize } from '@components/UI/Avatar'
import { Button, ButtonType } from '@components/UI/Button'
import { UserName } from '@components/UI/UserName'
import { UserInfo } from '@models/index'
import { Route } from '@router/types'
import { useAppSelector } from '@store/index'
import { Bio, StyledProfileInfo } from './styled'

export const ProfileInfo = ({ user }: { user: UserInfo }) => {
  const { photoURL, name, email, bio, uid } = user

  const currentUserId = useAppSelector((state) => state.user.user.uid)

  const navigate = useNavigate()

  const isCurrentUserProfile = currentUserId === uid

  return (
    <StyledProfileInfo>
      <div>
        <Avatar size={AvatarSize.LARGE} photoURL={photoURL} />
        <UserName name={name} email={email} uid={uid} col />
        <Bio>{bio}</Bio>
      </div>
      {isCurrentUserProfile && (
        <Button $type={ButtonType.OUTLINED} onClick={() => navigate(`${Route.PROFILE}/${uid}/edit`)}>
          Edit profile
        </Button>
      )}
    </StyledProfileInfo>
  )
}
