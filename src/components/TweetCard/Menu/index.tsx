import { useLocation, useNavigate } from 'react-router-dom'
import { ButtonType } from '@components/UI/Button'
import { PopConfirm } from '@components/UI/PopConfirm'
import { PopupMenu, PopupMenuPosition } from '@components/UI/PopupMenu'
import { useBooleanState } from '@hooks/useBooleanState'
import { Route } from '@router/types'
import { useDeleteTweetMutation } from '@store/api/tweets'
import { MenuButton, MenuOptionButton } from './styled'

interface Props {
  tweetId: string
}

export const Menu = ({ tweetId }: Props) => {
  const [popupVisible, togglePopup, , closePopup] = useBooleanState(false)

  const [confirmVisible, , showConfirm, hideConfirm] = useBooleanState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [trigger] = useDeleteTweetMutation()

  const deleteHandler = () => {
    trigger(tweetId)

    if (pathname.includes('post')) {
      navigate(Route.HOME)
    }
  }

  const menuButtonClickHandler = () => {
    togglePopup()
  }

  const deleteClickHandler = () => {
    showConfirm()
    closePopup()
  }

  return (
    <>
      <PopupMenu
        controlButton={<MenuButton onClick={menuButtonClickHandler}>...</MenuButton>}
        visible={popupVisible}
        closePopup={closePopup}
        position={PopupMenuPosition.LEFT}
      >
        <MenuOptionButton $type={ButtonType.FILLED} onClick={deleteClickHandler}>
          Delete
        </MenuOptionButton>
      </PopupMenu>
      <PopConfirm
        open={confirmVisible}
        onClose={hideConfirm}
        header="Confirm delete"
        message="Are you sure you want to delete the tweet?"
        onConfirm={deleteHandler}
        confirmButtonLabel="Delete tweet"
      />
    </>
  )
}
