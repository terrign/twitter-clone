import { NavLink } from 'react-router-dom'
import { LogoutIcon, TweetButtonIcon } from '@assets/index'
import { TweetForm } from '@components/TweetForm'
import { ButtonType, TweetButton } from '@components/UI/Button'
import { TwitterIcon } from '@components/UI/Icons'
import { Modal } from '@components/UI/Modal'
import { PopConfirm } from '@components/UI/PopConfirm'
import { UserCard } from '@components/UI/UserCard'
import { useBooleanState } from '@hooks/useBooleanState'
import { Route } from '@router/types'
import { useAppDispatch, useAppSelector } from '@store/index'
import { signOut } from '@store/slices/auth'
import { selectUser } from '@store/slices/user'
import { config } from './config'
import { navLinks } from './constants'
import { NavItem } from './NavItem'
import { LogoutButton, StyledAsideNavigation } from './styled'

const {
  logoutConfirmHeader,
  logoutConfirmMessage,
  logoutLabel,
  tweetButtonLabel,
  addTweetModalHeader,
  tweetIconTitle,
} = config

export const Navigation = () => {
  const dispatch = useAppDispatch()
  const { name, email, photoURL, uid } = useAppSelector(selectUser)
  const [modalOpen, , openModal, closeModal] = useBooleanState(false)
  const [confirmVisible, , showConfirm, hideConfirm] = useBooleanState(false)

  const logoutHandler = () => {
    dispatch(signOut())
  }

  return (
    <StyledAsideNavigation>
      <NavLink to={Route.HOME} title={tweetIconTitle}>
        <TwitterIcon $size="default" />
      </NavLink>

      <nav>
        <ul>
          {navLinks.map((a) => (
            <NavItem {...a} key={a.label} />
          ))}
        </ul>
      </nav>

      <TweetButton $type={ButtonType.FILLED} onClick={openModal} aria-label={tweetButtonLabel}>
        <span>{tweetButtonLabel}</span>

        <TweetButtonIcon />
      </TweetButton>
      <div>
        <UserCard name={name} email={email} url={photoURL} uid={uid} />
      </div>

      <LogoutButton $type={ButtonType.FILLED} onClick={showConfirm} $title={logoutLabel} aria-label={logoutLabel}>
        <span>{logoutLabel}</span>
        <LogoutIcon />
      </LogoutButton>
      <PopConfirm
        open={confirmVisible}
        onClose={hideConfirm}
        header={logoutConfirmHeader}
        message={logoutConfirmMessage}
        onConfirm={logoutHandler}
        confirmButtonLabel={logoutLabel}
      />
      <Modal open={modalOpen} onClose={closeModal} header={addTweetModalHeader}>
        <TweetForm onSubmit={closeModal} />
      </Modal>
    </StyledAsideNavigation>
  )
}
