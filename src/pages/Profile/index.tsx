import { DefaultProfileBackGround } from '@assets'
import { ProfileInfo } from '@components'
import { useAppSelector } from '@store'
import { Outlet } from 'react-router-dom'

import { ProfileBackground, ProfileHeader, ProfileWrapper } from './styled'

export const Profile = () => {
  const { name } = useAppSelector((state) => state.user.user)

  return (
    <ProfileWrapper>
      <ProfileHeader>
        <p>{name}</p>
        <p>{1} tweets</p>
      </ProfileHeader>
      <ProfileBackground $url={DefaultProfileBackGround} />
      <ProfileInfo />
      <Outlet />
    </ProfileWrapper>
  )
}
