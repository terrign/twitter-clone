import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Close } from '@assets/index'
import { useAppDispatch, useAppSelector } from '@store/index'
import { removeAlert } from '@store/slices/alert'
import { CloseButton, StyledNotification } from './styled'

const ALERT_EXPIRATION_TIME_MS = 5000

export const Notification = () => {
  const [alertVisible, setAlertVisible] = useState(false)
  const { message, type } = useAppSelector((state) => state.alert)
  const dispatch = useAppDispatch()
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearAlert = () => {
    setAlertVisible(false)
    dispatch(removeAlert())
  }

  useEffect(() => {
    if (message) {
      setAlertVisible(true)

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
    alertVisible &&
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
