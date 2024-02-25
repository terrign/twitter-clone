import { TweetForm } from '@components'
import { Route } from '@router'
import { tweetService } from '@services'
import { signOut, useAppDispatch, useAppSelector } from '@store'
import { Button, Modal, TwitterIcon, UserCard } from '@ui'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

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

  const openModal = () => [setTweetModalOpen(true)]

  const getTweets = async () => {
    const tweets = await tweetService.getTweetsByUserId(uid)
    console.log(tweets)
    await tweetService.deleteTweet(tweets[0].id)
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

      <Button $type="filled" onClick={openModal}>
        Tweet
      </Button>
      <div onClick={getTweets}>
        <UserCard name={name} email={email} url={photoURL} />
      </div>

      <LogoutButton $type="filled" onClick={logoutHandler}>
        Log out
      </LogoutButton>
      <Modal open={tweetModalOpen} onClose={closeModal} header="Add tweet">
        <TweetForm />
      </Modal>
    </StyledAsideNavigation>
  )
}
