import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { TweetButtonIcon } from '@assets'
import { TweetForm } from '@components'
import { Route } from '@router'
import { signOut, useAppDispatch, useAppSelector } from '@store'
import { Avatar, Modal, TweetButton, TwitterIcon, UserCard } from '@ui'
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

      <TweetButton $type="filled" onClick={openModal} $title="Tweet">
        <span>Tweet</span>

        <TweetButtonIcon />
      </TweetButton>
      <div>
        <UserCard name={name} email={email} url={photoURL} uid={uid} />
      </div>

      <LogoutButton $type="filled" onClick={logoutHandler} $title="Logout">
        <span>Log out</span>
        <Avatar size="s" photoURL={photoURL} />
      </LogoutButton>
      <Modal open={tweetModalOpen} onClose={closeModal} header="Add tweet">
        <TweetForm onSubmit={closeModal} />
      </Modal>
    </StyledAsideNavigation>
  )
}
