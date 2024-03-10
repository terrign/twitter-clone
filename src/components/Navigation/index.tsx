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
import { navLinks } from './constants'
import { NavItem } from './NavItem'
import { LogoutButton, StyledAsideNavigation } from './styled'

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
      <NavLink to={Route.HOME}>
        <TwitterIcon $size="default" />
      </NavLink>

      <nav>
        <ul>
          {navLinks.map((a) => (
            <NavItem {...a} key={a.label} />
          ))}
        </ul>
      </nav>

      <TweetButton $type={ButtonType.FILLED} onClick={openModal}>
        <span>Tweet</span>

        <TweetButtonIcon />
      </TweetButton>
      <div>
        <UserCard name={name} email={email} url={photoURL} uid={uid} />
      </div>

      <LogoutButton $type={ButtonType.FILLED} onClick={showConfirm} $title="Logout">
        <span>Log out</span>
        <LogoutIcon />
      </LogoutButton>
      <PopConfirm
        open={confirmVisible}
        onClose={hideConfirm}
        header="Confirm logout"
        message="Are you sure you want to logout?"
        onConfirm={logoutHandler}
        confirmButtonLabel="Log out"
      />
      <Modal open={modalOpen} onClose={closeModal} header="Add tweet">
        <TweetForm onSubmit={closeModal} />
      </Modal>
    </StyledAsideNavigation>
  )
}
