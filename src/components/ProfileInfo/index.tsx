import { Route } from '@router'
import { useAppSelector } from '@store'
import { Avatar, Button, UserName } from '@ui'
import { useNavigate } from 'react-router-dom'

import { Bio, StyledProfileInfo } from './styled'

export const ProfileInfo = () => {
  const { photoURL, name, email, bio } = useAppSelector((state) => state.user.user)

  const nav = useNavigate()

  return (
    <StyledProfileInfo>
      <div>
        <Avatar size="l" photoURL={photoURL} />
        <UserName name={name} email={email} col />
        <Bio>{bio}</Bio>
      </div>
      <Button $type="outlined" onClick={() => nav(Route.EDIT)}>
        Edit profile
      </Button>
    </StyledProfileInfo>
  )
}
