import { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation, YouMightLike } from '@components'
import { useOuterClickHandler } from '@hooks'
import { useAppSelector, useGetUserSuggestionsQuery } from '@store'
import { MainWrapper, PrivateRootWrapper, RightAside } from './styled'

export const PrivateRoot = () => {
  const [asideVisible, setAsideVisible] = useState<boolean>(false)
  const { uid } = useAppSelector((state) => state.user.user)
  const { data } = useGetUserSuggestionsQuery(uid)

  const asideRef = useRef<HTMLElement>(null)

  const toggleAside = (close?: false) => {
    setAsideVisible((prev) => close ?? !prev)
  }

  const closeAsideIfOpen = () => {
    asideVisible && setAsideVisible(false)
  }

  useOuterClickHandler(asideRef, closeAsideIfOpen)

  const tweets = data?.tweets
  const users = data?.users

  return (
    <PrivateRootWrapper id="privateRoot">
      <Navigation />
      <MainWrapper>
        <Outlet context={toggleAside} />
      </MainWrapper>
      <RightAside $visible={asideVisible} ref={asideRef}>
        <YouMightLike tweets={tweets} users={users} toggleAside={toggleAside} />
      </RightAside>
    </PrivateRootWrapper>
  )
}
