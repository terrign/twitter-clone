import { useRef } from 'react'
import { StyledTogggler, TogglerBar } from './styled'

interface Props {
  checked?: boolean
  onChange?: () => void
}

export function Toggler({ checked, onChange }: Props) {
  const checkBoxRef = useRef<HTMLInputElement>(null)

  const clickHandler = () => {
    const input = checkBoxRef.current

    if (input) {
      input.checked = !input.checked

      if (onChange) {
        onChange()
      }
    }
  }

  return (
    <StyledTogggler type="button" onClick={clickHandler} aria-label="theme toggler">
      <input type="checkbox" checked={checked} ref={checkBoxRef} readOnly />
      <TogglerBar />
    </StyledTogggler>
  )
}
