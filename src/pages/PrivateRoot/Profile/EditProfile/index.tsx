import { useNavigate } from 'react-router-dom'
import { ChangePasswordForm } from '@components/ChangePasswordForm'
import { EditProfileForm } from '@components/ProfileInfo/EditProfileForm'
import { Modal } from '@components/UI/Modal'
import { useAppSelector } from '@store/index'
import { selectUser } from '@store/slices/user'

export const EditProfile = () => {
  const { authProvider } = useAppSelector(selectUser)
  const navigate = useNavigate()

  const closeHandler = () => {
    navigate(-1)
  }

  return (
    <Modal onClose={closeHandler} open={true} header="Edit profile">
      <EditProfileForm />

      {authProvider === 'email' && <ChangePasswordForm />}
    </Modal>
  )
}
