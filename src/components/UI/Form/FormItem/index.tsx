import { PropsWithChildren } from 'react'

import { StyledFormItem } from './styled'

export interface FormItemProps extends PropsWithChildren {
  errorMessage?: string
  labeled?: boolean
}

export const FormItem = ({ children, errorMessage, labeled }: FormItemProps) => {
  return (
    <StyledFormItem $hasError={Boolean(errorMessage)} $labeled={labeled}>
      {children}
      {Boolean(errorMessage) && <span>{errorMessage}</span>}
    </StyledFormItem>
  )
}
