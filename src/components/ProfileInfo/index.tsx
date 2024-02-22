import { DefaultAvatarImage } from '@assets'
import { Route } from '@router'
import { useAppSelector } from '@store'
import { Avatar, Button, UserName } from '@ui'
import { useNavigate } from 'react-router-dom'

import { StyledProfileInfo } from './styled'

export const ProfileInfo = () => {
  const { photoURL, name, email } = useAppSelector((state) => state.user.user)

  const nav = useNavigate()

  return (
    <StyledProfileInfo>
      <div>
        <Avatar $size="l" $url={photoURL || DefaultAvatarImage} />
        <UserName name={name} email={email} col />
      </div>
      <Button $type="outlined" onClick={() => nav(Route.EDIT)}>
        Edit profile
      </Button>
    </StyledProfileInfo>
  )
}
