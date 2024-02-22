import { EditProfileForm } from '@components'
import { Modal } from '@ui'
import { useNavigate } from 'react-router-dom'

export const EditProfile = () => {
  const nav = useNavigate()

  const back = () => nav(-1)

  return (
    <Modal onClose={back} open={true} header={'Edit profile'}>
      <EditProfileForm />
    </Modal>
  )
}
