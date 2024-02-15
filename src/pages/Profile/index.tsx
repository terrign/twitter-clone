import { auth } from '@auth'
import { signOut } from '@firebase/auth'
import { Button } from '@ui'

export const Profile = () => {
  const logout = () => {
    signOut(auth)
  }

  return (
    <div>
      <Button onClick={logout} $type="outlined">
        Logout
      </Button>
    </div>
  )
}
