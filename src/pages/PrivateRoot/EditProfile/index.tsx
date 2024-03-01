import { ChangePasswordForm, EditProfileForm } from '@components'
import { useAppSelector } from '@store'
import { Modal } from '@ui'
import { useNavigate } from 'react-router-dom'

export const EditProfile = () => {
  const { authProvider } = useAppSelector((state) => state.user.user)
  const nav = useNavigate()

  const back = () => nav(-1)

  return (
    <Modal onClose={back} open={true} header={'Edit profile'}>
      <EditProfileForm />

      {authProvider === 'email' && <ChangePasswordForm />}
    </Modal>
  )
}
