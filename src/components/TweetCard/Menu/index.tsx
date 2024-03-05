import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ButtonType } from '@components/UI/Button'
import { PopupMenu, PopupMenuPosition } from '@components/UI/PopupMenu'
import { Route } from '@router/types'
import { useDeleteTweetMutation } from '@store/api/tweets'
import { MenuButton, MenuOptionButton } from './styled'

interface Props {
  tweetId: string
}

export const Menu = ({ tweetId }: Props) => {
  const [popupVisible, setPopupVisible] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [trigger] = useDeleteTweetMutation()

  const deleteHandler = () => {
    trigger(tweetId)

    if (pathname.includes('post')) {
      navigate(Route.HOME)
    }
  }

  const togglePopup = () => {
    setPopupVisible((prev) => !prev)
  }

  return (
    <PopupMenu
      controlButton={<MenuButton onClick={togglePopup}>...</MenuButton>}
      visible={popupVisible}
      setVisible={setPopupVisible}
      position={PopupMenuPosition.LEFT}
    >
      <MenuOptionButton $type={ButtonType.FILLED} onClick={deleteHandler}>
        Delete
      </MenuOptionButton>
    </PopupMenu>
  )
}
