import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { TweetButtonIcon } from '@assets/index'
import { TweetForm } from '@components/TweetForm'
import { Avatar, AvatarSize } from '@components/UI/Avatar'
import { ButtonType, TweetButton } from '@components/UI/Button'
import { TwitterIcon } from '@components/UI/Icons'
import { Modal } from '@components/UI/Modal'
import { UserCard } from '@components/UI/UserCard'
import { Route } from '@router/types'
import { useAppDispatch, useAppSelector } from '@store/index'
import { signOut } from '@store/slices/auth'
import { navLinks } from './constants'
import { NavItem } from './NavItem'
import { LogoutButton, StyledAsideNavigation } from './styled'

export const Navigation = () => {
  const dispatch = useAppDispatch()
  const { name, email, photoURL, uid } = useAppSelector((state) => state.user.user)
  const [tweetModalOpen, setTweetModalOpen] = useState(false)

  const logoutHandler = () => {
    dispatch(signOut())
  }

  const closeModal = () => {
    setTweetModalOpen(false)
  }

  const openModal = () => {
    setTweetModalOpen(true)
  }

  return (
    <StyledAsideNavigation>
      <NavLink to={Route.HOME}>
        <TwitterIcon $size="default" />
      </NavLink>

      <nav>
        {navLinks.map((a) => (
          <NavItem {...a} key={a.label} />
        ))}
      </nav>

      <TweetButton $type={ButtonType.FILLED} onClick={openModal}>
        <span>Tweet</span>

        <TweetButtonIcon />
      </TweetButton>
      <div>
        <UserCard name={name} email={email} url={photoURL} uid={uid} />
      </div>

      <LogoutButton $type={ButtonType.FILLED} onClick={logoutHandler} $title="Logout">
        <span>Log out</span>
        <Avatar size={AvatarSize.SMALL} photoURL={photoURL} />
      </LogoutButton>
      <Modal open={tweetModalOpen} onClose={closeModal} header="Add tweet">
        <TweetForm onSubmit={closeModal} />
      </Modal>
    </StyledAsideNavigation>
  )
}
