import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Route } from '@router'
import { useDeleteTweetMutation } from '@store'
import { PopupMenu } from '@ui'
import { MenuButton, MenuOptionButton } from './styled'

interface Props {
  tweetId: string
}

export const Menu = ({ tweetId }: Props) => {
  const [popupVisible, setPopupVisible] = useState(false)
  const loc = useLocation()
  const nav = useNavigate()

  const [trigger] = useDeleteTweetMutation()

  const deleteHandler = () => {
    trigger(tweetId)

    if (loc.pathname.includes('post')) {
      nav(Route.HOME)
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
      position="left"
    >
      <MenuOptionButton $type="filled" onClick={deleteHandler}>
        Delete
      </MenuOptionButton>
    </PopupMenu>
  )
}
