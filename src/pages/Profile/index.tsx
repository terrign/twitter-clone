import { signOut, useAppDispatch } from '@store'
import { Button } from '@ui'

export const Profile = () => {
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(signOut())
  }

  return (
    <div>
      <Button onClick={logout} $type="outlined">
        Logout
      </Button>
    </div>
  )
}
