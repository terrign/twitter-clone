import { useNavigate } from 'react-router-dom'
import { TelegramLogo } from '@assets/index'
import { Avatar, AvatarSize } from '@components/UI/Avatar'
import { Button, ButtonType } from '@components/UI/Button'
import { UserName } from '@components/UI/UserName'
import { UserInfo } from '@models/index'
import { Route } from '@router/types'
import { useAppSelector } from '@store/index'
import { selectUser } from '@store/slices/user'
import { Bio, StyledProfileInfo, TelegramIcon, TelegramLink } from './styled'

export const ProfileInfo = ({ user }: { user: UserInfo }) => {
  const { photoURL, name, email, bio, uid, tgLink } = user

  const currentUserId = useAppSelector(selectUser).uid

  const navigate = useNavigate()

  const isCurrentUserProfile = currentUserId === uid

  return (
    <StyledProfileInfo>
      <div data-testid="profileAvatar">
        <Avatar size={AvatarSize.LARGE} photoURL={photoURL} />
        <UserName name={name} email={email} uid={uid} col />
        {tgLink && (
          <TelegramLink href={tgLink}>
            <TelegramIcon src={TelegramLogo} />
            Telegram
          </TelegramLink>
        )}
        <Bio>{bio}</Bio>
      </div>
      {isCurrentUserProfile && (
        <Button $type={ButtonType.OUTLINED} onClick={() => navigate(`${Route.PROFILE}/${uid}${Route.EDIT}`)}>
          Edit profile
        </Button>
      )}
    </StyledProfileInfo>
  )
}
