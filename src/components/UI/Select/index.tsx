import { useRef, useState } from 'react'
import { DropDownIcon } from '@components/UI/Icons'
import { Input } from '@components/UI/Input'
import { useOuterClickHandler } from '@hooks/useOuterClickHandler'
import { IconWrapper, Option, Options, StyledSelect } from './styled'

interface Props {
  options: string[]
  value: string
  onSelect: (value: string) => void
  placeHolder?: string
}

export const Select = (props: Props) => {
  const { options, value, onSelect, placeHolder } = props
  const [optionsVisible, setOptionsVisible] = useState(false)

  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const hideOptions = () => {
    setOptionsVisible(false)
  }

  const showOptions = () => {
    setOptionsVisible(true)
  }

  useOuterClickHandler(selectRef, hideOptions)

  const focusHandler = () => {
    showOptions()
  }

  const selectHandler = (value: string) => () => {
    onSelect(value)
    hideOptions()
  }

  const iconClickHandler = () => {
    inputRef.current?.focus()
  }

  return (
    <StyledSelect ref={selectRef}>
      <Input defaultValue={value} onFocus={focusHandler} readOnly placeholder={placeHolder} ref={inputRef}></Input>
      {optionsVisible && (
        <Options>
          {options.map((option) => (
            <Option onClick={selectHandler(option)} key={option}>
              {option}
            </Option>
          ))}
        </Options>
      )}
      <IconWrapper onClick={iconClickHandler} type="button">
        <DropDownIcon $down={optionsVisible} />
      </IconWrapper>
    </StyledSelect>
  )
}
