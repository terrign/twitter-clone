import { Button, ButtonType } from '@components/UI/Button'
import { Modal } from '@components/UI/Modal'
import { ConfirmButton, Footer, Text } from './styled'

interface Props {
  open: boolean
  onClose: () => void
  message?: string
  confirmButtonLabel: string
  header?: JSX.Element | string
  onConfirm: () => void
}

export const PopConfirm = (props: Props) => {
  const { open, onClose, onConfirm, header, confirmButtonLabel, message } = props

  return (
    <Modal open={open} onClose={onClose} header={header}>
      <Text>{message}</Text>
      <Footer>
        <ConfirmButton $type={ButtonType.FILLED} onClick={onConfirm}>
          {confirmButtonLabel}
        </ConfirmButton>
        <Button $type={ButtonType.FILLED} onClick={onClose}>
          Cancel
        </Button>
      </Footer>
    </Modal>
  )
}
