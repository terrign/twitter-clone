import { useNavigate } from 'react-router-dom'
import { ChangePasswordForm } from '@components/ChangePasswordForm'
import { EditProfileForm } from '@components/EditProfileForm'
import { Modal } from '@components/UI/Modal'
import { useAppSelector } from '@store/index'

export const EditProfile = () => {
  const { authProvider } = useAppSelector((state) => state.user.user)
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
