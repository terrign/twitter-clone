import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Close } from '@assets/index'
import { useBooleanState } from '@hooks/useBooleanState'
import { useAppDispatch, useAppSelector } from '@store/index'
import { removeAlert } from '@store/slices/alert'
import { CloseButton, StyledNotification } from './styled'

const ALERT_EXPIRATION_TIME_MS = 5000

export const Notification = () => {
  const [notificationVisible, , showNotification, hideNotification] = useBooleanState(false)
  const { message, type } = useAppSelector((state) => state.alert)
  const dispatch = useAppDispatch()
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAlert = () => {
    hideNotification()
    dispatch(removeAlert())
  }

  useEffect(() => {
    if (message) {
      showNotification()

      intervalRef.current = setTimeout(clearAlert, ALERT_EXPIRATION_TIME_MS)

      return () => {
        intervalRef.current && clearTimeout(intervalRef.current)
      }
    }
  }, [message, type])

  const closeHandler = () => {
    clearAlert()
  }

  const mouseEnterHandler = () => {
    intervalRef.current && clearTimeout(intervalRef.current)
  }

  const mouseLeaveHandler = () => {
    intervalRef.current = setTimeout(clearAlert, ALERT_EXPIRATION_TIME_MS)
  }

  return (
    notificationVisible &&
    createPortal(
      <StyledNotification $type={type} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
        <CloseButton onClick={closeHandler}>
          <Close />
        </CloseButton>
        {message}
      </StyledNotification>,
      document.body,
    )
  )
}
