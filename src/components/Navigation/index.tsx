import { TweetForm } from '@components'
import { Route } from '@router'
import { signOut, useAppDispatch, useAppSelector } from '@store'
import { Button, Modal, TwitterIcon, UserCard } from '@ui'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { navLinks } from './constants'
import { NavItem } from './NavItem'
import { LogoutButton, StyledAsideNavigation } from './styled'

export const Navigation = () => {
  const dispatch = useAppDispatch()

  const { name, email, photoURL } = useAppSelector((state) => state.user.user)

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
    <div>
      <StyledAsideNavigation>
        <NavLink to={Route.HOME}>
          <TwitterIcon $size="default" />
        </NavLink>

        <nav>
          {navLinks.map((a) => (
            <NavItem {...a} key={a.label} />
          ))}
        </nav>

        <Button $type="filled" onClick={openModal}>
          Tweet
        </Button>
        <div>
          <UserCard name={name} email={email} url={photoURL} />
        </div>

        <LogoutButton $type="filled" onClick={logoutHandler}>
          Log out
        </LogoutButton>
        <Modal open={tweetModalOpen} onClose={closeModal} header="Add tweet">
          <TweetForm />
        </Modal>
      </StyledAsideNavigation>
    </div>
  )
}
