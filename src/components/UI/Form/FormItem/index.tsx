import { PropsWithChildren } from 'react'
import { StyledFormItem } from './styled'

interface Props extends PropsWithChildren {
  errorMessage?: string
  labeled?: boolean
}

export const FormItem = (props: Props) => {
  const { children, errorMessage, labeled } = props

  return (
    <StyledFormItem $hasError={Boolean(errorMessage)} $labeled={labeled}>
      {children}
      {Boolean(errorMessage) && <span>{errorMessage}</span>}
    </StyledFormItem>
  )
}
