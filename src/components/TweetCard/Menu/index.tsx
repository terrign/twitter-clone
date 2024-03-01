import { useDeleteTweetMutation } from '@store'
import { PopupMenu } from '@ui'
import { useState } from 'react'

import { MenuButton, MenuOptionButton } from './styled'

interface Props {
  tweetId: string
}

export const Menu = ({ tweetId }: Props) => {
  const [popupVisible, setPopupVisible] = useState(false)

  const [trigger] = useDeleteTweetMutation()

  const deleteHandler = () => {
    trigger(tweetId)
  }

  return (
    <PopupMenu
      controlButton={<MenuButton onClick={() => setPopupVisible((prev) => !prev)}>...</MenuButton>}
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
